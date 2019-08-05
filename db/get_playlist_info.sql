select * from songs
join songs_in_playlist
on songs.song_id = songs_in_playlist.song_id
join playlist
on playlist.playlist_id = songs_in_playlist.playlist_id
where playlist.playlist_id = $1;