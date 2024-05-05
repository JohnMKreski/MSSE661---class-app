const SONGS_API = `${BASE_API_URL}/song_requests`; // http://localhost:3000/api/song_requests

const deleteSong = (roleType, songId) =>
  _delete(`${SONGS_API}/${roleType, songId}`, OPTIONS_WITH_AUTH);