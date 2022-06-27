const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
  const authorizationHeader = req.headers['authentication']
  console.log('author',authorizationHeader);
  const token = authorizationHeader.split(' ')[1];
  
  if (token) {
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log('err',err.message);
        return res.status(400).json({err})
        // res.redirect('/login');
      } else {
        console.log('dataToken',decodedToken);
        res.locals.token = decodedToken;
        next();
      }
    });
  } else {
    res.json('token is not exist!')
  }
};

module.exports = { requireAuth };