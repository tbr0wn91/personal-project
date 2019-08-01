update playlist
set playlist_name = $1
where playlist_id = $2;

select * from playlist;
