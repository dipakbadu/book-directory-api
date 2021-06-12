const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose')
const jwtConfig = require('./app/config/jwtConfig')
const jwt = require('jsonwebtoken');
const errorResponse = require('./app/response/error.response')

const app = express()

app.use(express.urlencoded({ extended: false }))

var corsOptions = {
  origin: "http://localhost:8000"
};
app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/book_directory', { useNewUrlParser: true, useUnifiedTopology: true });

const mongoDb = mongoose.connection;
if (!mongoDb)
  console.log("Error connecting to mongo db")
else
  console.log("Db connected successfully -- MongoDB")

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method !== 'GET' && req.url.includes('books')) {
    if (req.headers.authorization) {
      let authorization = req.headers.authorization.split(' ')[1],
        decoded;
      try {
        decoded = jwt.verify(authorization, jwtConfig.secret);
        if (decoded.role !== 'admin') {
          return res.status(403).json({
            message: errorResponse.FORBIDDEN
          })
        }
      } catch (e) {
        return res.status(401).json({
          message: errorResponse.UNAUTHORIZED
        });
      }
    } else {
      return res.status(401).json({
        message: errorResponse.UNAUTHORIZED
      });
    }
  }
  next();
});

app.use(express.json())

const routers = require('./app/routes/routers')
app.use(routers)


app.listen(8000, () => {
  console.log('Running on port 8000')
})
