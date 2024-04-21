const SONGS_API = `${BASE_API_URL}/song_requests`; // http://localhost:3000/api/song_requests

const getUserSongs = () => _get(SONGS_API, OPTIONS_WITH_AUTH);

const getSongs = () => _getAll(SONGS_API);

// const addSong = (formData) =>
//   _post(SONGS_API, formData);

  const addSong = (formData) =>
  _post(SONGS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const deleteSong = (roleType, songId) =>
  _delete(`${SONGS_API}/${roleType, songId}`, OPTIONS_WITH_AUTH);