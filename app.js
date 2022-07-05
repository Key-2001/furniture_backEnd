const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');
require('dotenv').config()
const app = express()
const port = process.env.PORT ||8080;
const users = require('./routes/user');
const admin = require('./routes/admin');
const product = require('./routes/product')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect');
const { requireAuth } = require('./middleware/authMiddleware');
const upload = require('./middleware/multer')
const Image = require('./models/Image')
const fs = require('fs')
// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(cors({
    origin:"*",
    credentials: true,
}))
// console.log('path',path.join(__dirname, 'uploads'));
// routes
app.get('/',requireAuth, (req, res) => {
  res.send('Hello World!')
})
app.use('/api/v1/users',users)
app.use('/api/v1/admin',admin)
app.use('/api/v1/products',product)



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