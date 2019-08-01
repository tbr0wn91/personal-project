insert into songs(name, artist)
values( $1, $2);

select * from playlist;
join song
on playlist.playlist_id = song.song_id