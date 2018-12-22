create table books(
    id int not null auto_increment primary key,
    isbn varchar(20) not null,
    openId varchar(50) not null,
    title varchar(100) not null,
    images_medium varchar(100),
    images_large varchar(100),
    publisher varchar(50) not null,
    summary varchar(1000) not null,
    price varchar(100),
    author varchar(100)
)
