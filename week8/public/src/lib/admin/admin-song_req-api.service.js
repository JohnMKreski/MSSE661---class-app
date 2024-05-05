const USERINFO_API = `${BASE_API_URL}/user/me`; // http://localhost:3000/api/user
const USERSONGS_API = `${BASE_API_URL}/song_requests`; // http://localhost:3000/api/song_requests


class UsersService {
    getUser = () => _get(USERINFO_API, DEFAULT_OPTIONS_WITH_AUTH);

    updateMe = (formData) => _put(`${USERINFO_API}/update`, formData, DEFAULT_OPTIONS_WITH_AUTH);

    // getUserReqs = (userId, roleType) => _getUserSongs(`${SONGS_API}/${userId, roleType}`, OPTIONS_WITH_AUTH);
}

