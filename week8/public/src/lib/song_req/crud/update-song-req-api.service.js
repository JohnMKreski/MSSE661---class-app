const SONGS_API = `${BASE_API_URL}/song_requests`; // http://localhost:3000/api/song_requests


const updateSong = (formData) =>
_post(SONGS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

