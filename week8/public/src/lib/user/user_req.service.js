/**
 * @class Song_Req
 *
 * Creates a list of songs and updates a list
 */

class Song_Req {
  songs = [];
  songsService;

  constructor(songsService) {
    this.songsService = songsService;
  }

  init() {
    this.render(); //renders(displays) the dom
  }

  /**
   * DOM renderer for building the list row item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deleteTask(e, index)">X</button>
   *   <span>Task name</span>
   *   <span>pending</span>
   *   <span>date create</span>
   * </li>
   */

  _renderUserReqModal = (song) => {
    const userReqUpdateModal = document.getElementById('user_reqUpdateModal');

    // Populate the modal with user information
    const userSongTitleInput = document.getElementById('userSongTitle');
    const userArtistNameInput = document.getElementById('userArtistName');


    userSongTitleInput.placeholder = `Current Song Title: ${song.song_title}`;
    userArtistNameInput.placeholder = `Current Artist: ${song.artist_name}`;

    const userReqSubmitButton = document.getElementById('userReqSubmitButton');
    userReqSubmitButton.addEventListener('click', this._updateEventHandler(song));


    // Show the modal
    $(userReqUpdateModal).modal('show');
  };
  _renderTableRowItem = (song) => {
    // const listGroupItem = document.createElement('li');
    // listGroupItem.id = `song-${song.song_id}`;
    // listGroupItem.className = 'list-group-item';

    // const deleteBtn = document.createElement('button');
    // const deleteBtnTxt = document.createTextNode('X');
    // deleteBtn.id = 'delete-btn';
    // deleteBtn.className = 'btn btn-secondary';
    // deleteBtn.addEventListener('click', this._deleteEventHandler(song.song_id));
    // deleteBtn.appendChild(deleteBtnTxt);

    // const songTitleSpan = document.createElement('span');
    // const songTitle = document.createTextNode(song.song_title);
    // songTitleSpan.appendChild(songTitle);

    // const artistNameSpan = document.createElement('span');
    // const artistName = document.createTextNode(song.artist_name);
    // artistNameSpan.appendChild(artistName);

    // const songStatusSpan = document.createElement('span');
    // const songStatus = document.createTextNode(song.status);
    // songStatusSpan.append(songStatus);

    // const songDateSpan = document.createElement('span');
    // const songDate = document.createTextNode(song.created_date);
    // songDateSpan.append(songDate);


    const tableRow = document.createElement('tr');
    tableRow.id = `song-${song.song_id}`;
    tableRow.className = 'table-rows';

    const columnNames = ['user_id', 'song_id', 'artist_name', 'song_title', 'status', 'created_date'];



    columnNames.forEach((columnName) => {
      const td = document.createElement('td');
      td.textContent = song[columnName]; // Access the corresponding property from the song object
      tableRow.appendChild(td);
  });

    const updateUserReqButtonCell = document.createElement('td');
    const updateUserReqButton = document.createElement('button');
    updateUserReqButton.textContent = 'Update Your Song Request';
    updateUserReqButton.addEventListener('click', () => this._renderUserReqModal(song));
    updateUserReqButtonCell.appendChild(updateUserReqButton);
    tableRow.appendChild(updateUserReqButtonCell);

    return tableRow;
  };

  //   // add list item's details
  //   listGroupItem.append(deleteBtn);
  //   listGroupItem.append(songTitleSpan);
  //   listGroupItem.append(artistNameSpan);
  //   listGroupItem.append(songStatusSpan);
  //   listGroupItem.append(songDateSpan);


  //   return listGroupItem;
  // };

  /**
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderTable = () => {
    // get the "Loading..." text node from parent element
    const songsTbody = document.getElementById('user-songs');
    const loadingRow = document.getElementById('loading-row');

    loadingRow.innerHTML = '';

    const fragment = document.createDocumentFragment();

    this.songs.forEach((song) => {
      const tableRow = this._renderTableRowItem(song); // Call the _renderTableRowItem method
      fragment.appendChild(tableRow); // Append the table row to the fragment
    });

    // Append the generated rows to the tbody
    songsTbody.appendChild(fragment);

    // Remove the "Loading..." cell
    if (loadingRow) loadingRow.parentNode.removeChild(loadingRow);
};

  /**
   * DOM renderer for displaying a default message when a user has an empty table.
   */
  _renderMsg = () => {
    const songsTbody = document.getElementById('user-songs');
    const loadingRow = document.getElementById('loading-row');
    const msgRow = this._createMsgElement('You have zero requests. Request some songs!');


    if (songsTbody) {
      songsTbody.replaceWith(msgRow, loadingRow);
    } else {
      songsTbody.replaceWith(msgRow, songsTbody);
    }
  };

  /**
   * Pure function for adding a song.
   *
   * @param {Object} newTask - form's values as an object
   */
  addSong = async (newSong) => {
    try {
      const { artist_name, song_title, status } = newSong;
      await this.songsService.addSong({ artist_name, song_title, status }); // we just want the name and status
      this.songs.push(newSong); // push song with all it parts
    } catch (err) {
      console.log(err);
      alert('Unable to add song request. Please try again later.');
    }
  };

  /**
   * DOM Event handler helper for adding a song to the DOM.
   *
   * @param {number} taskId - id of the song to delete
   */
  _addSongEventHandler = () => {
    const songInput = document.getElementById('formInputSongTitle');
    const song_title = songInput.value;

    const artistInput = document.getElementById('formInputArtistName');
    const artist_name = artistInput.value;

    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;

    // validation checks
    if (!song_title) {
      alert('Please enter a song title.');
      return;
    }

    if (!artist_name) {
      alert('Please enter an artist name.');
      return;
    }

    const song = { artist_name, song_title, status }; // assemble the new song req parts
    const { newSong, newSongEl } = this._createNewSongEl(song); // add song to list

    this.addTask(newSong);

    const listParent = document.getElementById('user-songs');

    if (listParent) {
      listParent.appendChild(newSongEl);
    } else {
      this._renderList();
    }
    songInput.value = ''; // clear form text input
    artistInput.value = ''; // clear form text input

  };

  /**
   * Create the DOM element for the new song with all its parts.
   *
   * @param {Object} song - { task_name, status } partial status object
   */
  _createNewSongEl = (song) => {
    const song_id = this.songs.length;
    const created_date = new Date().toISOString();
    const newSong = { ...song, song_id, created_date };
    const newSongEl = this._renderTableRowItem(newSong);

    return { newSong, newSongEl };
  };

  updateSong = async (songId) => {
    try {
      const res = await this.songsService.updateSong(songId);
      // this.songs = this.songs.filter((song) => song.song_id !== songId);

      if (res !== null) {
        alert('Song updated successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to update song. Please try again later.');
    }
  };

  /**
   * DOM Event handler helper for deleting a song from the DOM.
   * This relies on a pre-existing in the list of songs.
   *
   * @param {number} taskId - id of the song to delete
   */
  _updateEventHandler = (songId) => () => {
    const song = document.getElementById(`song-${songId}`);
    // song.remove();

    this.updateSong(songId).then(() => {
      if (!this.songs.length) {
        this._renderMsg();
      }
    });
  };

  /**
   * Pure function for deleting a song.
   *
   * @param {number} taskId - id for the song to be deleted
   */
  deleteSong = async (songId) => {
    try {
      const res = await this.songsService.deleteSong(songId);
      this.songs = this.songs.filter((song) => song.song_id !== songId);

      if (res !== null) {
        alert('Song deleted successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to delete song. Please try again later.');
    }
  };

  /**
   * DOM Event handler helper for deleting a song from the DOM.
   * This relies on a pre-existing in the list of songs.
   *
   * @param {number} taskId - id of the song to delete
   */
  _deleteEventHandler = (songId) => () => {
    const song = document.getElementById(`song-${songId}`);
    song.remove();

    this.deleteSong(songId).then(() => {
      if (!this.songs.length) {
        this._renderMsg();
      }
    });
  };

  /**
   * Creates a message div block.
   *
   * @param {string} msg - custom message to display
   */
  _createMsgElement = (msg) => {
    const msgRow = document.createElement('tr');
    const textCell = document.createElement('td');
    textCell.innerText = msg;
    msgRow.id = 'user-message';
    msgRow.className = 'center';
    msgRow.appendChild(textCell);

    return msgRow;
  };

  render = async (userId) => {
    const songs = await this.songsService.getUserSongs(userId);
    // console.log(songs);
    try {
      if (songs.length) {
        this.songs = songs;
        this._renderTable();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
}