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

    deleteSong: (req, res, next) => {

    },

    deletePlaylist: (req, res, next) => {

    },

    getAllUserPlaylists: (req, res, next) => {

    }
}