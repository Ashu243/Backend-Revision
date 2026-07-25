const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const userRoutes = require('./src/routes/user.routes.js')
const taskRoutes = require('./src/routes/task.routes.js')
const connectDB = require('./src/config/db.js')
const cookieParser = require('cookie-parser')
port = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()
app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res)=>{
    res.send('hey')
})

app.listen(port, ()=>{
    console.log(`server is listening at port:${port}`)
})