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
        const {playlist_id} = req.body;

        db.delete_playlist(playlist_id)
        res.status(200).send(`Your playlist is gone FOREVER!`)
    },

    getAllUserPlaylists: (req, res, next) => {

    }
}