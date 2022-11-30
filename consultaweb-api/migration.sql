create table tcc.Especialista
(
    id               int auto_increment
        primary key,
    name             varchar(255)         not null,
    active           tinyint(1) default 1 null,
    especialidade_id int                  not null,
    username         varchar(120)         not null,
    password         varchar(250)         not null
);

create table tcc.disponibilidades
(
    id              int auto_increment
        primary key,
    especialista_id int      not null,
    paciente_id     int      null,
    horario         datetime not null
);

create table tcc.especialidades
(
    id   int auto_increment
        primary key,
    name varchar(120) not null,
    constraint especialidade_name_uindex
        unique (name)
);

create table tcc.users
(
    id       int auto_increment
        primary key,
    name     varchar(200)         null,
    active   tinyint(1) default 1 null,
    username varchar(120)         not null,
    password varchar(250)         not null
);

