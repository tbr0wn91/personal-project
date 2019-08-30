const express = require('express');
const massive = require('massive');
const session = require('express-session');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const { login, logout, register, userSession} = require('./controller/authController')
const { createPlaylist, addSong, addSongToPlaylist, changePlaylistName, deleteSongInPlaylist, deletePlaylist, getAllUserPlaylists, selectAllSongs, playlistInfo} = require('./controller/playlistController');
require('dotenv').config();
const app = express();
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;
app.use(express.json());
app.use( express.static( `${__dirname}/../build` ) );


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();


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



//s3

const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: process.env.S3_BUCKET,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
  };

  app.post('/api/file_upload', (request, response) => {
    const form = new multiparty.Form();
      form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          const path = files.file[0].path;
          console.log('path', path)
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const fileName = `bucketFolder/${timestamp}-lg`;
          console.log(fileName)
          const data = await uploadFile(buffer, fileName, type);
          return response.status(200).send(data);
          console.log('data', data)
        } catch (error) {
          console.log(`this tis the error`, error)
          return response.status(400).send(error);
        }
      });
  })


  const path = require('path')
  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
  })


app.listen(SERVER_PORT, () => console.log(`listening on server port ${SERVER_PORT}`))