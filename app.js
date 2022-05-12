const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT;
const users = require('./routes/user')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json())


// routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/v1',users)
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