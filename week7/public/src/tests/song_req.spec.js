const songsService = new SongsService();
const song_req = new Song_Req(songsService);

describe('Song_Req App', () => {
  it('should initialize some HTML', () => {
    spyOn(song_req, 'init');//spy doesnt render DOM
    song_req.init();

    expect(song_req.init).toHaveBeenCalled();
  });

  it('should add a song', async () => {
    const newSong = {
      song_id: 0,
      artist_name: 'Test Artist',
      song_title: 'Test Song',
      status: 'not played',
      created_date: '2024-04-24 22:50:32',
    };
    const addSongServiceSpy = spyOn(songsService, 'addSong');

    expect(song_req.song.length).toBe(0);

    await song_req.addSong(newSong);

    expect(addSongServiceSpy).toHaveBeenCalled();
    expect(song_req.songs.length).toBe(1);
  });

  it('should delete a song', async () => {
    const existingSong = {
      song_id: 0,
      artist_name: 'Test Artist',
      song_title: 'Test Song',
      status: 'not played',
      created_date: '2024-04-24 22:50:32',
    };
    const deleteSongServiceSpy = spyOn(songsService, 'deleteSong');

    expect(song_req.songs.length).toBe(1);

    await song_req.deleteSong(existingSong.song_id);

    expect(deleteSongServiceSpy).toHaveBeenCalled();
    expect(song_req.songs.length).toBe(0);
  });

  it('should update an individual song', async () => {
    const existingSong = {
      song_id: 0,
      artist_name: 'Test Artist',
      song_title: 'Test Song',
      status: 'played',
      created_date: '2024-04-24 22:50:32',
    };
    const updateSongServiceSpy = spyOn(songsService, 'updateSong');

    expect(song_req.songs.length).toBe(1);

    await song_req.updateSong(existingSong.song_id);

    expect(updateSongServiceSpy).toHaveBeenCalled();
    expect(song_req.songs.length).toBe(0);
  });
});

    //xit doesnt run the test
    //fit runs just that test