var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var {isEmail} = require('validator');
var passwordValidator = require('password-validator');
var schemaPassword = new passwordValidator();


var schema = new Schema({
    email : {type:String, require:[true,'Please enter email'],validate:[isEmail,'Please enter a valid email']},
    firstname: {type:String, require:[true,'Please enter a name']},
    lastname:{type:String,require:true},
    password:{type:String, require:[true,'please enter password'],minlength:[6,'Please enter a minimum of six characters']},
    creation_dt:{type:Date, require:true},
    radius:{type:Number,default:20},
    dob:{type:Date,require:true},
    isVerified:{type:Boolean,default:false},
});


schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',schema);



