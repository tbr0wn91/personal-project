insert into profile( user_id,first_name, last_name, picture)
values( $1, $2, $3, $4);

select * from users
join profile
on users.user_id = profile.user_id
where users.user_id = $1;