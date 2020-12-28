create table user_authority
(
    id           serial primary key,
    user_id      int references user_account (ID),
    authority_id int references authority (ID)
)
