create table courses
(
    ID            serial primary key,
    name          varchar(255) not null,
    description   text         not null,
    createdDate  timestamp    not null,
    modifiedDate timestamp,
    number_of_lessons INT not null,
    lessons_per_week INT not null
)