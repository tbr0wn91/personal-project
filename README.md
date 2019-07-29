***Backend***

***dependencies***
- express
- massive
- dotenv
- express-session 
- bcrypt

***Backend file structure***
- server/
  - index.js
  - middlewares
    - middleware.js
  - controller
       - authController.js
       - playlistController.js

***EndPoints***

auth endpoints
- login: => /api/login
- register => /api/register
- logout => /api/logout
- userSession => /api/user_session

playlist endpoints

- getAllUsers = >/api/users
- getAllUserPlaylists => /api/user_playlists
- createPlaylist => /api/create_playlist
- addSong => /api/add_song
 -deleteSong => /api/ delete_song
- deletePlaylist => /api/ delete_playlist

***Database***

- Users

```sql

create table Users(
user_id serial primary key,
username varchar(32) not null,
email text not null,
password text not null
);

create table Playlist (
playlist_id serial primary key,
playlist_name varchar(40) not null,
user_id integer references Users(user_id)

);

create table Songs(
song_id serial primary key,
name varchar(200) not null,
artist varchar(200) not null,
playlist_id integer references Playlist(playlist_id)
);

create table Songs_In_Playlist(
playlist_song_id serial primary key
song_id integer references Songs(song_id)
playlist_id integer references Playlist(playlist_id
);
```

***FrontEnd***

***dependencies***

install and require:
- axios
- react-router-dom(BrowserRouter)
- redux
- react-redux
- node-sass
- http-proxy-middleware
- redux-promise-middleware

***Routes***
- Home => / => Login.js
- Login => Login/Register.js
- Profile=> / profile => Profile.js
- Playlist =>/CreatePlaylist => CreatePlaylist.js
- DisplayPlaylist => /CreatePlaylist/DisplayPlaylist

***Frontend File Structure***

- src/
  - components
   - Home
     - Login.js(view 1)
     - Login.css/ scss
     - Register.js(view 2)
     - Register.css / scss
    - Profile
        - Profile.js
        - Profile.css/ scss
    - Playlist
      - CreatePlaylist.js(view 3)
      - CreatePlaylist.css / scss
    - DisplayPlaylist
      - DisplayPlaylist.js
      - DisplayPlaylist.css/scss

  - App.js
  - index.js
  - reset.css
  - setupProxy.js
  - redux
    - store.js
    - reducer.js




