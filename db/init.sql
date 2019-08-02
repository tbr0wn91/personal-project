drop table if exists users;
drop table if exists playlist;
drop table if exists songs;
drop table if exists songs_in_playlist;

create table users(
    user_id serial primary key,
    username varchar(32) not null,
    email text not null,
    password text not null
);

insert into users(username, password, email)
values('tbrown', 'test', 'tbrown@gmail.com');

create table playlist(
    playlist_id serial primary key,
    playlist_name varchar(40) not null,
    user_id integer references user(user_id)
);

insert into playlist(playlist_name, user_id)
values('my first playlist', 1);

create table songs(
    song_id serial primary key,
    name varchar(200) not null,
    artist varchar(200) not null
);

insert into songs(name, artist)
values('babyshark', 'pinkfong');

create table songs_in_playlist(
    playlist_song_id serial primary key,
    song_id integer references songs(song_id),
    playlist_id integer references playlist(playlist_id)
);

create table profile(
    profile_id serial primary key,
    first_name varchar(32)not null,
    last_name varchar(32) not null,
    picture text default
);


-- grabs playlist name and song name and artist and joins it onto one table
select * from songs
join songs_in_playlist
on songs.song_id = songs_in_playlist.song_id
join playlist
on playlist.playlist_id = songs_in_playlist.playlist_id
where user_id = $1;