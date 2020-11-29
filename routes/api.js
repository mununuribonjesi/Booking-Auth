"use strict";

const express = require('express');
const User = require('../models/user');
const verificationToken = require('../models/verification');
const router = express.Router();

require('dotenv').config();
const jwt = require('jsonwebtoken');
var registration = require('../methods/register')
var confirmation = require('../methods/confrimationPost');
var passport = require('../methods/login');

//These are the aplications end points

//registering api
router.post('/register', function (req, res, next) {
  registration.register(req,res);
});

router.get('/confirmation',function(req,res,next){
  confirmation.confirmationPost(req,res);
});

// add user to database


//Login Api 
router.post('/login',function(req,res,next){
  passport.authentication(req,res,next)

});

router.post('/verification',function(req,res,next){
  verifyToken(req,res,next)

});

function  verifyToken(req,res,next){

  if(!req.headers['authorization'])
  {
    return res.status(400).send({
      message:'no authorization header'
    })
  }

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1]

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload) =>{
    
    if(err)
    {
      return res.sendStatus(403);   

    }

    req.payload = payload
    next()

    return res.send({payload:payload}).status(200);
    
  })  
}

module.exports = router;



