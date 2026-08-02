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
('Deep', 'Deep@gmail.com', 'Deep', 15, 'Gurgaon'),
('vandana', 'vandana@gmail.com', 'vandana', 43, 'Delhi'),
('Seema', 'Seema@gmail.com', 'Seema', 25, 'Banglore'),
('palak', 'palak@gmail.com', 'palak', 17, 'Gurgaon');

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


-- Count
SELECT COUNT(*) FROM users;

-- count city
select count(city) from users;


-- avg
select avg(age) from users;

-- max
select max(age) from users;

-- min 
select min(age) from users;

-- distinct - return unique
select distinct city from users;

select count(distinct city) from users; -- returns count of distinct city


-- Group by
select city, count(*) as people_living
from users
group by city;

-- show city where more than 1 person lives
select city, count(*)
from users
group by city
having count(*)>1; -- why not (where)? because where works on rows not groups. Having works on groups


-- GROUP BY
-- Count users in each city.
select city, count(*) as people_living
from users
group by city;

-- Find the average age in each city.
select city, avg(age) as average_age
from users
group by city;

-- Find the maximum age in each city.
select city, max(age) as max_age
from users
group by city;

-- Find the minimum age in each city.
select city, min(age) as min_age
from users
group by city;


-- HAVING
-- Show cities having more than 1 user.
select city, count(*)
from users
group by city
having count(*)>1;

-- Show cities where the average age is greater than 22.
select city, avg(age)
from users
group by city
having avg(age)>22;

-- Show cities having exactly 2 users.
select city, count(*)
from users
group by city
having count(*)=2;

-- Can you write one query that returns:

-- City	    Users	Average Age
-- Delhi	3	    23
-- Goa	    2	    24.5

select city, count(*) as Users, avg(age) as Average_age
from users
group by city;




-- creating orders table
create table orders(
    id serial primary key,
    user_id int,
    product varchar(100) not null,

    constraint fk_user
    foreign key (user_id)
    references users(id)
);

alter table orders
add amount int;

insert into orders (user_id, product)
values
(2, 'laptop'),
(4, 'Shirt'),
(5, 'books'),
(6, 'phone'),
(7, 'pen');


-- INNER JOIN - only returns matching rows from both the table
select users.name, orders.product -- columns to show in result
from users -- left table
inner join orders -- right table
on users.id = orders.user_id; -- condition to match both the tables

-- LEFT JOIN - return all the rows from left table and matching rows from right table
select u.name, o.product
from users u -- here u is alias
left join orders o
on u.id = o.user_id;

-- RIGHT JOIN - return matching rows from left table and all the rows from right table
select users.name, orders.product
from users
right join orders
on users.id = orders.user_id;

-- FULL OUTER JOIN - return all the rows from left and right table if they match or not
select users.name, orders.product
from users
full outer join orders
on users.id = orders.user_id;




-- Write a query to show:
-- Name	Total Orders
-- Ashu	2
-- Rahul	1
-- Aman	0
-- Neha	1
-- Priya	0

select users.name, count(orders.id) as total_orders
from users
left join orders
on users.id = orders.user_id
group by users.name;


-- Show every user and the total amount they have spent.
-- Expected output:
-- Name	Total Spent
-- Ashu	1700
-- Rahul	60000
-- Aman	0
-- Neha	15000
-- Priya	0

select users.name, COALESCE(sum(orders.amount), 0)
from users
left join orders
on users.id = orders.user_id
group by users.name;


-- Only users who have placed more than one order.
-- Expected output:
-- Name	Total Orders
-- Ashu	 2

select users.name, count(orders.id) as total_orders
from users
left join orders
on users.id = orders.user_id
group by users.name
having count(orders.id) > 1;



CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price INT
);


INSERT INTO products (id, name, price)
VALUES
(101, 'Mouse', 500),
(102, 'Keyboard', 1200),
(103, 'Laptop', 60000),
(104, 'Monitor', 15000),
(105, 'laptop stand', 1000),
(106, 'Monitor stand', 1500),
(107, 'Usb Dongle', 15000);

ALTER TABLE orders
ADD COLUMN product_id INT;

UPDATE orders SET product_id = 101 WHERE id = 1;
UPDATE orders SET product_id = 102 WHERE id = 2;
UPDATE orders SET product_id = 103 WHERE id = 3;
UPDATE orders SET product_id = 104 WHERE id = 4;
UPDATE orders SET product_id = 105 WHERE id = 5;
UPDATE orders SET product_id = 106 WHERE id = 6;
UPDATE orders SET product_id = 107 WHERE id = 7;

alter table orders
drop column amount;



-- Your challenge

-- Write one query that returns:

-- User	Product	Price
-- Ashu	Mouse	500
-- Ashu	Keyboard	1200
-- Rahul	Laptop	60000
-- Neha	Monitor	15000

select users.name, products.name, products.price
from users
inner join orders
on users.id = orders.user_id
left join products
on products.id = orders.product_id;