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

  _renderTableRowItem = (song) => {

    const tableRow = document.createElement('tr');
    tableRow.id = `song-${song.song_id}`;
    tableRow.className = 'table-rows';

    const columnNames = ['user_id', 'song_id', 'artist_name', 'song_title', 'status', 'created_date'];



    columnNames.forEach((columnName) => {
      const td = document.createElement('td');
      td.textContent = song[columnName]; // Access the corresponding property from the song object
      tableRow.appendChild(td);
    });

    const statusButtonCell = document.createElement('td');
    const statusButton = document.createElement('button');
    // statusButton.textContent = 'Played';
    statusButton.textContent = song.status === 'not played' ? 'Not Played' : 'Played';

    // Check if the song status is stored in localStorage
    const storedStatus = localStorage.getItem(`song-${song.song_id}-status`);
    if (storedStatus) {
        song.status = storedStatus; // Update song status with stored value
        statusButton.textContent = song.status === 'played' ? 'Played' : 'Not Played'; // Update button text content
        tableRow.style.backgroundColor = localStorage.getItem(`song-${song.song_id}-backgroundColor`) || ''; // Update row background color
    }

    statusButton.addEventListener('click', () => {
        // localStorage.removeItem(`song-${song.song_id}-status`);
        // localStorage.removeItem(`song-${song.song_id}-backgroundColor`);

        // Toggle the status of the song
        song.status = song.status === 'played' ? 'not played' : 'played';

        // Update the text content of the button to reflect the new status
        statusButton.textContent = song.status === 'played' ? 'Played' : 'Not Played';

        // Update the background color of the table row
        tableRow.style.backgroundColor = song.status === 'played' ? 'green' : '';

        // Store the updated status and styles in localStorage
        localStorage.setItem(`song-${song.song_id}-status`, song.status);
        localStorage.setItem(`song-${song.song_id}-backgroundColor`, tableRow.style.backgroundColor);

        // Log the updated status to the console (you can replace this with your actual update logic)
        console.log(`Status Changed: Song ID ${song.song_id}, Status ${song.status}`);
    });

    statusButtonCell.appendChild(statusButton);
    tableRow.appendChild(statusButtonCell);


    const deleteButtonCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      // Show a confirmation dialog
      const confirmed = window.confirm(`Are you sure you want to delete ${song.song_id} - ${song.song_title} by ${song.artist_name}?`);
  
      // If the user confirms the deletion, log the message
      if (confirmed) {
          console.log('Song deleted.');
          // You can add your delete logic here
      } else {
          console.log('Deletion canceled.');
      }
  });
    deleteButtonCell.appendChild(deleteButton);
    tableRow.appendChild(deleteButtonCell);

    return tableRow;
  };

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
    const msgDiv = this._createMsgElement('Request some new songs!');

    if (songsTbody) {
      songsTbody.replaceChild(msgDiv, loadingRow);
    } else {
      songsTbody.replaceChild(msgDiv, songsTbody);
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
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const songs = await this.songsService.getAllSongsByUser();

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