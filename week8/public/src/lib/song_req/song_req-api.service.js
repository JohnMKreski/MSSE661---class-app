const SONGS_API = `${BASE_API_URL}/song_requests`; // http://localhost:3000/api/song_requests

class SongsService {
  getAllSongsByUser = () => _getAllByUser(SONGS_API, OPTIONS_WITH_AUTH);

  getAllSongsByGuest = () => _getAllByGuest(SONGS_API, DEFAULT_OPTIONS);

  getUserSongs = (userId) => _getUserSongs(`${SONGS_API}/${userId}`, OPTIONS_WITH_AUTH);
  
  addSong = (userId) => _post(SONGS_API, userId, DEFAULT_OPTIONS_WITH_AUTH);

  updateSong = (songId) => _put(`${SONGS_API}/${songId}`, OPTIONS_WITH_AUTH);

  deleteSong = (songId) => _delete(`${SONGS_API}/${songId}`, OPTIONS_WITH_AUTH);

}

