# Schema Information

## Users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
(maybe add user details if have time)

## Restaurants
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator     | integer   | not null, foreign key (references users), indexed
title       | string    |
cuisine     | string    |
blurb       | string    |
description | string    |
target      | integer   | (goal $ to raise)
current     | integer   | (current $ raised)
expiration  | date      | (date money must be raised by)
location    | string    | (city)
published   | boolean   | (boolean that will indicate whether it shows publicly)


## Contributions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
resta_id    | integer   | not null, foreign key (references restaurant), indexed
value       | integer   | (contribution $ amount) not null

## Rewards
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
resta_id    | integer   | not null, foreign_key (references restaurants), indexed
description | integer   | not null
amount_left | integer   |
limited     | boolean   | not null
dolar_amount| integer   | not null


## Rewardee Join table (joins users and rewards they have earned)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | string    | not null, foreign_key
reward_id   | integer   | not null, foreign_key
