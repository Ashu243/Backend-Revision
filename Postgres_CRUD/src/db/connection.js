const { Pool } = require('pg')
require('dotenv').config()

try {
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    })

    // async function createtables(){
    //     await pool.query(`CREATE table products(
    //     id SERIAL PRIMARY KEY,
    //     type VARCHAR(100) NOT NULL,
    //     name VARCHAR(100) NOT NULL,
    //     price INT NOT NULL,
    //     created_at TIMESTAMP DEFAULT NOW()
    //     )`)
    // }

    // createtables()

    console.log('Database Connected!')
    module.exports = pool;
} catch (error) {
    console.log('Database connection Error', error)   
}
