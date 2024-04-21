/**
 * AJAX update song status to song table on save.
 */
const updateSongStatus = async (e) => {
    e.preventDefault();

    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;
  
  
    const res = await updateStatus({ status });
  
    if (res !== null) {
      inst.generateSongs();
    }
  };