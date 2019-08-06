const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { login, logout, register, userSession} = require('./controller/authController')
const { createPlaylist, addSong, addSongToPlaylist, changePlaylistName, deleteSongInPlaylist, deletePlaylist, getAllUserPlaylists, selectAllSongs, playlistInfo} = require('./controller/playlistController');
require('dotenv').config();
const app = express();
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;
app.use(express.json());


massive(CONNECTION_STRING).then(db => {
    console.log(`connected to the db`)
    app.set('db', db)
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 // 2 weeks
    }
}))

//auth endpoints

app.post(`/auth/login`, login)
app.post(`/auth/register`, register)
app.get(`/auth/logout`, logout)
app.get(`/auth/user_session`, userSession)

// playlist endpoints

app.post(`/api/create_playlist`, createPlaylist)
app.post(`/api/add_song`, addSong)
app.post(`/api/song_to_playlist`, addSongToPlaylist)
app.delete(`/api/delete_song`, deleteSongInPlaylist)
app.delete(`/api/delete_playlist/:playlist_id`, deletePlaylist)
app.put(`/api/update_playlist_name/:user_id`, changePlaylistName)
app.get(`/api/user_playlists`, getAllUserPlaylists)
app.get(`/api/get_all_songs`, selectAllSongs)
app.get(`/api/playlist_info/:playlist_id`, playlistInfo )



app.listen(SERVER_PORT, () => console.log(`listening on server port ${SERVER_PORT}`))