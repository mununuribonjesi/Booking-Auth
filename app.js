"use strict";
const serverless = require('serverless-http');
var express = require('express');
var app = express();
const mongoose = require('mongoose');
const api = require('./routes/api');
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser')
var cors = require('cors')
require('./routes/config/passport-config');
require('dotenv').config();

mongoose.connect(
    'mongodb+srv://MuniBanks:<225231>@cluster0.j1t7o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{ 
        useNewUrlParser: true
},

);

mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.once("open", () => {
    console.log("sucessfully connected to MongoDb");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized:false
}));

app.use(express.json());
app.use('/api',api);

app.get('/', (req, res) => {
  res.send('Authentication Service')
})

module.exports.handler = serverless(app);
