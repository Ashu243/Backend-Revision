-- Challenge 1: Create a Table
create table users(
    id serial primary key,
    name varchar(100) not null,
    email varchar(100) unique not null,
    password varchar(50) not null,
    created_at timestamp default now()
);

alter table users
add age int,
add city varchar(50);

-- Challenge 2: Insert Data
insert into users (name, email, password, age, city)
values 
('Ashu', 'ashu@gmail.com', 'ashu', 20, 'Gurgaon'),
('Rahul', 'rahul@gmail.com', 'Rahul', 23, 'Delhi'),
('Priya', 'priya@gmail.com', 'Priya', 25, 'Mumbai'),
('Aman', 'aman@gmail.com', 'Aman', 27, 'Goa');

-- Challenge 3: Retrieve Data

-- Write SQL queries for:

-- Show all users.
-- Show only username and city.
-- Show users whose age is greater than 21.
-- Show users from Gurgaon.
-- Show users from Delhi whose age is greater than 22.

select * from users;

select name, city from users;

select * from users
where age>21;

select * from users
where city = 'Gurgaon';

select * from users
where city = 'Delhi' and age>22;


-- Challenge 4: Update
-- Ashu moved to Jaipur.
-- Rahul's age became 23.
-- Everyone from Delhi gets age increased by 1.

update users
set city = 'Jaipur'
where name = 'Ashu';

update users
set age = 24
where name = 'Rahul';

update users
set age = age+1
where city = 'Delhi';



-- Challenge 5: Delete
-- Delete Priya.
-- Delete everyone younger than 21.

delete from users
where name = 'Priya';

delete from users
where age<21;


-- Challenge 6: Ordering
-- Show users ordered by age (ascending).
-- Show users ordered by age (descending).
-- Order by city, then age.

select * from users
order by age asc;

select * from users
order by age desc;

select * from users
order by city asc, age asc;

-- Challenge 7: Filtering

-- Using the same users table, write queries to:

-- Find users whose age is between 20 and 25.
-- Find users whose city is Delhi OR Jaipur.
-- Find users whose name starts with A.
-- Find users whose email ends with gmail.com.
-- Find users whose age is NOT 24.

select * from users
where age between 20 and 25;

select * from users
where city in ('Delhi', 'Jaipur');

select * from users
where name like 'A%';

select * from users
where email like '%gmail.com';

select * from users
where age != 24;


-- Q1
-- Find users whose name contains "sh" anywhere.

select * from users
where name like '%sh%';

-- Q2
-- Find users whose name ends with "a".
select * from users
where name like '%a';

-- Q3
-- Find users whose city is not Delhi or Jaipur.
select * from users
where city not in ('Delhi', 'Jaipur');

-- Q4
-- Find users whose age is 20, 22, or 27.

select * from users
where age in (20, 22, 27);

-- Q5
-- Find users whose email is not from Gmail.
select * from users
where email not like '%gmail%';

-- Q6
-- Find users whose age is greater than 20 but less than 30 and who live in Goa.
select * from users
where age>20 and age<30 and city='Goa';

-- Write a query that returns everyone whose name starts with A but does NOT start with Am.
select * from users
where name not like 'Am%'
and name like 'A%';


