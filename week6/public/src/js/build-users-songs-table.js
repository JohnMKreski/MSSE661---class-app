class SongsTable {
  headers = [];
  songs = [];

  constructor() {}

  /**
   * Build song table parent.
   * Uses bootstrap classes with some custom overrides.
   */
  createSongTableParent = () => {
    const table = document.createElement('tbody');
    table.id = 'songs';
    table.className = '';
    return table;
  };

  _deleteEventHandler = (songId) => async () => {
    if (songId) {
      const res = await deleteTask(songId);

      if (res !== null) {
        this.songs = this.songs.filter((song) => song.song_id !== songId);
        const song = document.getElementById(`song-${songId}`);
        song.remove();

        if (!this.songs.length) {
          const div = document.getElementById('songs');
          const loadingDiv = div.childNodes[1];
          const errDiv = this.generateErrorMsg('Create some new songs!');
          div.replaceChild(errDiv, loadingDiv);
        }
      }
    }
  };

  /**
   * Builds the list item.
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
  // buildSongTableHead = (song_req) => {
  //   const tableHead = document.createElement('thead');
  //   // tableHead.scope = 'col';
  //   tableHead.class = 'table-headers'
  //   tableHead.id = `table_headers`; // song_req-1

  //   ['ID', 'Artist', 'Song Title', 'Status', 'Date'].forEach(headerText => {
  //         const th = document.createElement('th');
  //         th.innerText = headerText;
  //         tableHead.appendChild(th);
  //   });

  //   return tableHead;
  // };

  buildSongTableRows = (song_req) => {
    const tableRow = document.createElement('tr');
    tableRow.className = 'table-rows';
    tableRow.id = `table_rows`; // song_req-1


    ['user_id', 'id', 'artist_name', 'song_title', 'status', 'created_date'].forEach(item => {
      const td = document.createElement('td');
      td.innerText = song_req[item];
      tableRow.appendChild(td);
    });

    return tableRow;
  };


  // buildSongTableRowItem = (song_req) => {
  //   const tableBody = document.createElement('tbody');
  //   tableBody.id = `song_req-${song_req.songId}`; // song_req-1
  //   tableRow.scope = 'row';
    

  //   const tableRow = document.createElement('tr');
  //   tableRow.id = `song_req-${song_req.songId}`; // song_req-1
  //   tableRow.scope = 'row';

  //   const deleteBtn = document.createElement('button');
  //   const deleteBtnTxt = document.createTextNode('X');
  //   deleteBtn.className = 'btn btn-secondary';
  //   deleteBtn.addEventListener('click', this._deleteEventHandler(song_req.song_id));
  //   deleteBtn.appendChild(deleteBtnTxt);

  //   const artistNameSpan = document.createElement('span');
  //   const artistName = document.createTextNode(song_req.artist_name);
  //   artistNameSpan.appendChild(artistName);

  //   const songTitleSpan = document.createElement('span');
  //   const songTitle = document.createTextNode(song_req.song_title);
  //   songTitleSpan.appendChild(songTitle);

  //   const songStatusSpan = document.createElement('span');
  //   const songStatus = document.createTextNode(song_req.status);
  //   songStatusSpan.append(songStatus);

  //   const songDateSpan = document.createElement('span');
  //   const songDate = document.createTextNode(song_req.created_date);
  //   songDateSpan.append(songDate);

  //   // add list item's details
  //   tableRow.append(deleteBtn);
  //   tableRow.append(artistNameSpan);
  //   tableRow.append(songTitleSpan);
  //   tableRow.append(songStatusSpan);
  //   tableRow.append(songDateSpan);

  //   tableBody.append(tableRow);

  //   return tableBody;
  // };

  /**
   * Assembles the list items then mounts them to a parent node.
   * Uses bootstrap classes with some custom overrides.
   */
  // buildSongsTableHead = (mount, headers) =>
  //   headers.map((song) => {
  //     const tableHeadersGroup = this.buildSongTableHead(song);
  //     // const tableGroupRowItem = this.buildSongTableRowItem(song);
  //     //this.class() <- function to call functions within a class

  //     // add entire list item
  //     // tableHeadersGroup.append(tableRowsGroup);
  //     mount.append(tableHeadersGroup);
  //   });

    buildSongsTable = (mount, songs) =>
    songs.map((song) => {
      const tableRowsGroup = this.buildSongTableRows(song);
      // const tableGroupRowItem = this.buildSongTableRowItem(song);
      //this.class() <- function to call functions within a class

      // add entire list item
      // tableHeadersGroup.append(tableRowsGroup);
      mount.append(tableRowsGroup);
    });
    

  generateErrorMsg = (msg) => {
    const div = document.createElement('div');
    const text = document.createTextNode(msg);
    div.id = 'user-message';
    div.className = 'center';
    div.appendChild(text);
    return div;
  };


  generateSongs = async () => {

    const res = await getSongs();
    const tbody = document.getElementById('songs');
    const loadingRow = tbody.firstChild;
    console.log(tbody.childNodes);

    // console.log(loadingDiv);


    //either swaps div or send error msg
    if (res.length) {
      this.songs = res;
      const songsDiv = this.createSongTableParent();
      this.buildSongsTable(songsDiv, res);
      tbody.replaceWith(songsDiv, loadingRow);
    } else {
      const errDiv = this.generateErrorMsg(res.msg);
      tbody.replaceChild(errDiv, loadingRow);
    }
  };
}


const inst = new SongsTable();

// This is an IIFE (Immediately Invoked Function Expression).
//auto generates list when site is loaded 
(async () => {
  inst.generateSongs();
})();