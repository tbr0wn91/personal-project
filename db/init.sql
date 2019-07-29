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
