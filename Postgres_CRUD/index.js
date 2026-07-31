const express = require('express')
const app = express()
const dotenv = require('dotenv')
const pool = require('./src/db/connection.js')
const morgan = require('morgan')

dotenv.config()

// middlewares
app.use(express.json())
app.use(morgan('tiny'))


const port = process.env.PORT || 3000

app.get('/', async(req, res)=>{
    const result = await pool.query('SELECT * FROM users')
    res.send(result.rows)
})


app.post('/users', async(req, res)=>{
    const {username, email, password} = req.body
    const result = await pool.query(`
        INSERT INTO users (username, email, password)
        VALUES 
        ($1, $2, $3)
         RETURNING *`,
        [username, email, password])
    res.send(result.rows)

})

app.post('/products', async(req, res)=>{
    const result = await pool.query(`
        INSERT INTO products (type, name, price)
        VALUES
        ('clothing', 'Adidas Shoes', 2000),
        ('clothing', 'Adidas Shoes', 4000),
        ('clothing', 'Adidas Shoes', 6000),
        ('clothing', 'Adidas Shoes', 7000),
        ('clothing', 'Adidas Shoes', 5000)
        RETURNING *
        `)
    res.send(result.rows)
})

app.get('/products', async(req, res)=>{
    const result = await pool.query(`
        SELECT * FROM products
        WHERE name = 'PUMA tshirt'
        ORDER BY price ASC
        LIMIT 2 OFFSET 1
        `)
    res.send(result.rows)
})


app.delete('/users/:id', async(req, res)=>{
    const {id} = req.params
    const result = await pool.query(`
        DELETE FROM users
        WHERE id=$1
        RETURNING *
        `, [id])
    res.send(result.rows)
})


app.put('/users/:id', async(req, res)=>{
    const {id} = req.params
    const {username} = req.body
    const result = await pool.query(`
        UPDATE users
        SET username=$1
        WHERE id=$2
        RETURNING username, email
        `, [username, id])
    res.send(result.rows)
})



app.listen(port, ()=>{
    console.log(`server is listening on port: ${port}`)
})