module.exports = {
    createPlaylist: async (req, res, next) => {
        const db = req.app.get('db');
        let {playlist_name, user_id} = req.body;

        const madePlaylist = await db.create_playlist([playlist_name, user_id])
        res.status(200).send(madePlaylist)
        
    },

    addSong: async (req, res, next) => {
        const db = req.app.get('db')
        let {name, artist} = req.body;
        const song = await db.add_song([name, artist])
        res.status(200).send(song)
    },

    addSongToPlaylist: async (req, res, next) => {
        
        const db = req.app.get('db')
        let {playlist_id, song_id} = req.body;

        const songToPlaylist = await db.add_song_to_playlist([playlist_id, song_id])
        res.status(200).send(songToPlaylist)
    },

    deleteSongInPlaylist: (req, res, next) => {
        const db = req.app.get('db');
        let {playlist_id ,song_id} = req.body;

        db.delete_song([playlist_id,song_id])
        res.status(200).send(`boop`)
    },

    deletePlaylist: (req, res, next) => {
        const db = req.app.get('db');
        const {playlist_id} = req.params;
        console.log(`this is the playlist to delete`, playlist_id)

        db.delete_playlist(playlist_id)
        res.status(200).send(`Your playlist is gone FOREVER!`)
    },

    changePlaylistName: (req, res, next) => {
        const db = req.app.get('db');
        const {playlist_name, playlist_id} = req.body;
        const {user_id} = req.params

        db.change_playlist_name([playlist_name, playlist_id, user_id])
        .then(name =>{
            res.status(200).send(name)
        }).catch(err => console.log(`Whoops can't do that`))
    },

    getAllUserPlaylists: (req, res, next) => {
        
        const db = req.app.get('db')
        const {user_id} = req.query;
        

        db.get_user_playlists(user_id).then(playlists => {
            
            res.status(200).send(playlists)
        }).catch(err => console.log(`uh oh couldnt get your playlists`))
    },

    selectAllSongs: (req, res, next) => {
        const db = req.app.get('db');
        
        db.select_all_song().then(songs => {
            res.status(200).send(songs)
        })
    },

    playlistInfo: (req, res, next) => {
        const db = req.app.get('db');
        const {playlist_id} = req.params;

        db.get_playlist_info(playlist_id).then(playlist => {
            res.status(200).send(playlist)
        }).catch(err => console.log(`could not get that specific playlist`, err))
    }
}