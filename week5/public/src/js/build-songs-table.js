/**
 * html structure
 *
 * @example
 * <ul class="songs-list">
 *  <li class="song-item">
 *    <div class="song-item-td">
 *      <span class="song-checkbox"><input type="checkbox"></span>
 *      <span class="song-name">Task name</span>
 *      <span class="song-status">pending</span>
 *      <span class="song-date">date create</span>
 *    </div>
 *  </li>
 * </ul>
 */

// This is an IIFE (Immediately Invoked Function Expression).
// What it does is in the name.
(async () => {
  const songs = await getSongs();
  console.log(songs);

  if (songs.length) {
      const div = document.getElementById('songs');
      const loadingDiv = div.childNodes[1];
  
      const table = document.createElement('table');
  
      // Replace 'loading...' with table
      div.replaceChild(table, loadingDiv); // Order is important here!
  
      // header row
      const headerRow = document.createElement('thead');
      headerRow.className = 'song-headers';
      ['Checkbox', 'ID', 'Artist', 'Song Title', 'Status', 'Date'].forEach(headerText => {
          const th = document.createElement('th');
          th.innerText = headerText;
          headerRow.appendChild(th);
      });
      table.appendChild(headerRow);
  
      // Created rows for each song using map()
      songs.map(song => {
          const tr = document.createElement('tr');
          const checkboxTd = document.createElement('td');
          const checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkboxTd.appendChild(checkbox);
          tr.appendChild(checkboxTd);

          // data table in array
          ['id', 'artist_name', 'song_title', 'status', 'created_date'].forEach(item => {
              const td = document.createElement('td');
              td.innerText = song[item];
              tr.appendChild(td);
          });
  
          // Append row to table
          table.appendChild(tr);
      });
  }
})();
