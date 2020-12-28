create table enrollments
(
    id            serial primary key,
    course_name     int       not null,
    user_id       int       not null,
    foreign key (course_id) references courses (id),
    foreign key (user_id) references user_account (id)
);