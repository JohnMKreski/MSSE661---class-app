const USERINFO_API = `${BASE_API_URL}/user/me`; // http://localhost:3000/api/user

const getUser = () => _get(USERINFO_API);