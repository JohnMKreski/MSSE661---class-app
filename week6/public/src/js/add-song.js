/**
 * AJAX add new songs to song table on save.
 */
// const doAddUserSong = async (e) => {
//     e.preventDefault();
  
//     const artistInput = document.getElementById('formInputArtistName');
//     const artist_name = artistInput.value;
//     const songInput = document.getElementById('formInputSongTitle');
//     const song_title = songInput.value;


//     const statusSelect = document.getElementById('formSelectStatus');
//     const options = statusSelect.options;
//     const selectedIndex = statusSelect.selectedIndex;
//     const status = options[selectedIndex].text;
  
//     if (!artist_name) {
//       alert('Please enter an artist.');
//       return;
//     }

//     if (!song_title) {
//       alert('Please enter a song title.');
//       return;
//     }
  
//     const res = await addUserSong({ artist_name, song_title });
  
//     if (res !== null) {
//       inst.generateSongs();
//     }
//     artistInput.value = '';
//     songInput.value = '';
//   };

  const doAddSong = async (e) => {
    e.preventDefault();
  
    const artistInput = document.getElementById('formInputArtistName');
    const artist_name = artistInput.value;
    const songInput = document.getElementById('formInputSongTitle');
    const song_title = songInput.value;


    // const statusSelect = document.getElementById('formSelectStatus');
    // const options = statusSelect.options;
    // const selectedIndex = statusSelect.selectedIndex;
    // const status = options[selectedIndex].text;
  
    if (!artist_name) {
      alert('Please enter an artist.');
      return;
    }

    if (!song_title) {
      alert('Please enter a song title.');
      return;
    }
  
    const res = await addSong({ artist_name, song_title });
  
    if (res !== null) {
      inst.generateSongs();
    }
    artistInput.value = '';
    songInput.value = '';
  };