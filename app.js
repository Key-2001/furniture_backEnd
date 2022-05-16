const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT ||8080;
const users = require('./routes/user');
const admin = require('./routes/admin')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors({
    origin:"*",
    credentials: true,
}))

// routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/v1/users',users)
app.use('/api/v1/admin',admin)
app.use('*',notFound)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,() => {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();