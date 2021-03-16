const User = require('../models/user');
const verificationToken = require('../models/verification');
var crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const Moment = require('moment');




async function resendVerification(req,res)
{
    User.findOne({email:req.body.email},function(err,user){

        if (err) { return res.status(500).send({ msg: err.message }); }
    
            var token = new verificationToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    
            token.save(function (err)
            {
                if(err) { return res.status(500).send({ msg: err.message }); }
    
                var msg = { from: 'mbonjesi@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/dev\/api\/confirmation?token=' + token.token + '\n' };
    
                sgMail
                .send(msg)
                .then(() => {
                    res.status(200).send(user.email);
                })
                .catch((err) => {
                    res.status(500).send(err.message);
                })
            });
    })
}

async function register(req, res) {


    User.findOne({email:req.body.email},function(err,user){
    
        if(user) return res.status(400).send({msg:'The email address you have entered is already associated with another account.'});
        if (err) { return res.status(500).send({ msg: err.message }); }
    
        //create and save user 
        user = new User({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: User.hashPassword(req.body.password),
            dob:req.body.dob,
            creation_dt: Date.now()
          });
    
          user.save(function(err)
          {
            if (err) { return res.status(500).send({ msg: err.message }); }
    
            var token = new verificationToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    
            token.save(function (err)
            {
                if(err) { return res.status(500).send({ msg: err.message }); }
    
                var msg = { from: 'mbonjesi@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/dev\/api\/confirmation?token=' + token.token + '\n' };
    
                sgMail
                .send(msg)
                .then(() => {
                    res.status(200).send(user.email);
                })
                .catch((err) => {
                    res.status(500).send(err.message);
                })
                
            });
          });
        });
    };


    async function checkEmail(req,res)
    {

        User.findOne({email:req.body.email},function(err,user){
    
            if(user) return res.status(400).send({msg:'The email address you have entered is already associated with another account.'});
            
        });

    }


module.exports = {
    register,
    resendVerification,
    checkEmail
}