require('dotenv').config();
const express = require('express')
const app = express()
const router = require('./routes/index')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

//const cookieSession = require('cookie-session')

//app.use(express.static("public"));

app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {

    console.log("Req.cookies.security:", req.cookies.security)
    next()
});

app.use('/', router)

module.exports = app;