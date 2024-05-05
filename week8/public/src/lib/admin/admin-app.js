const songsService = new SongsService();
const song_req = new Song_Req(songsService);

const usersService = new UsersService();
const user_req = new User_Req(usersService);

song_req.init();
user_req.init();