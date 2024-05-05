const USERINFO_API = `${BASE_API_URL}/user/me`; // http://localhost:3000/api/user
const USERSONGS_API = `${BASE_API_URL}/song_requests`; // http://localhost:3000/api/song_requests


class UsersService {
    getUser = () => _get(USERINFO_API, DEFAULT_OPTIONS_WITH_AUTH);

    // updateMe = (formData) => _put(`${USERINFO_API}/update`, formData, DEFAULT_OPTIONS_WITH_AUTH);

    // getUserReqs = (userId) => _getUserSongs(`${SONGS_API}/${userId}`, OPTIONS_WITH_AUTH);
}

class UserApiService {
    updateMe = (formData) => _put(`${USERINFO_API}/updateMe`, formData, DEFAULT_OPTIONS_WITH_AUTH);

    updatePass = (formData) => _put(`${USERINFO_API}/updatePass`, formData, DEFAULT_OPTIONS_WITH_AUTH);

}

const usersApiService = new UserApiService();

// const userService = new UsersService();


// const USER_API = `${BASE_API_URL}/user/me`; // http://localhost:3000/api/user/me

// class UserApiService {
//   getMe = () => _get(USER_API, DEFAULT_OPTIONS_WITH_AUTH);

//   updateMe = (formData) =>
//     _put(`${USER_API}/update`, formData, DEFAULT_OPTIONS_WITH_AUTH);
// }

// const userService = new UserApiService();