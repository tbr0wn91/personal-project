select * from users
join profile
on users.user_id = profile.user_id
where users.email = $1;