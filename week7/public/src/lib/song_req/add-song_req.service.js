
class Song_Req {
  userReq = [];
  userReqService;

  constructor(userReqService) {
    this.userReqService = userReqService;
  }

  init() {
    this.render(); //renders(displays) the dom
  }


  _renderFormItems = (song) => {
    const form = document.createElement('form');
    form.id = 'songRequestForm';
    form.className = 'card';

    const artistNameInput = document.createElement('input');
    artistNameInput.id = 'formInputArtistName';
    artistNameInput.className = 'form-control';
    artistNameInput.type = 'text';
    artistNameInput.name = 'artistInput';
    artistNameInput.placeholder = 'Artist Name';
    artistNameInput.value = song ? song.artist_name : ''; // Pre-fill artist name if provided


    const songTitleInput = document.createElement('input');
    songTitleInput.id = 'formInputSongTitle';
    songTitleInput.className = 'form-control';
    songTitleInput.type = 'text';
    songTitleInput.name = 'song-title';
    songTitleInput.placeholder = 'Song Title';
    songTitleInput.value = song ? song.song_title : ''; // Pre-fill song title if provided


    const addButton = document.createElement('button');
    addButton.type = 'submit'; 
    addButton.className = 'btn btn-primary';
    addButton.textContent = 'ADD';
    addButton.onclick = this._addSongEventHandler;

    form.appendChild(artistNameInput);
    form.appendChild(songTitleInput);
    form.appendChild(addButton);

    return form;
  };

  _renderForm = () => {
    const formBody = document.getElementById('formBody');
    const loadingDiv = document.getElementById('loading-div');

    loadingDiv.innerHTML = '';

    const fragment = document.createDocumentFragment();

    this.userReq.forEach((song) => {
      const formItem = this._renderFormItems(song);
      fragment.appendChild(formItem);
    });

    formBody.appendChild(fragment);

    if (loadingDiv) loadingDiv.parentNode.removeChild(loadingDiv);
  };


  _renderMsg = () => {
    const formBody = document.getElementById('formBody');
    const loadingDiv = document.getElementById('loading-div');
    const msgDiv = this._createMsgElement('Request some new songs!');

    if (formBody) {
      formBody.replaceChild(msgDiv, loadingDiv);
    } else {
      formBody.replaceChild(msgDiv, formBody);
    }
  };


  addSong = async (newSong) => {
    try {
      await this.userReqService.addSong(newSong);
      this.userReq.push(newSong);
    } catch (err) {
      console.log(err);
      alert('Unable to add song request. Please try again later.');
    }
  };


  _addSongEventHandler = (event) => {
    event.preventDefault(); // Prevent form submission
    const form = event.target.form;
    const artistName = form.artistInput.value;
    const songTitle = form['song-title'].value;

    if (!songTitle || !artistName) {
      alert('Please enter both artist name and song title.');
      return;
    }

    const newSong = { artist_name: artistName, song_title: songTitle };
    this.addSong(newSong);

    form.reset(); // Clear form inputs after adding the song
  };

  _createNewSongEl = (song) => {
    const song_id = this.userReq.length;
    const created_date = new Date().toISOString();
    const newSong = { ...song, song_id, created_date };
    const newSongEl = this._renderFormItems(newSong);

    return { newSong, newSongEl };
  };

  
  deleteSong = async (songId) => {
    try {
      const res = await this.userReqService.deleteSong(songId);
      this.userReq = this.userReq.filter((song) => song.song_id !== songId);

      if (res !== null) {
        alert('Song deleted successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to delete song. Please try again later.');
    }
  };


  _deleteEventHandler = (songId) => () => {
    const song = document.getElementById(`song-${songId}`);
    song.remove();

    this.deleteSong(songId).then(() => {
      if (!this.userReq.length) {
        this._renderMsg();
      }
    });
  };


  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const userReq = await this.userReqService.addSong();

    try {
      if (userReq.length) {
        this.userReq = userReq; // Initialize userReq with fetched songs
        this._renderForm();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
}