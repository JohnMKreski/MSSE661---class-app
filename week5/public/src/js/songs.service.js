const SONGS_API = `${BASE_API_URL}/song_requests`; // http://localhost:3000/api/song_requests

const getSongs = () => _get(SONGS_API);