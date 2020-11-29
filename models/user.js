var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var {isEmail} = require('validator');
var passwordValidator = require('password-validator');
var schemaPassword = new passwordValidator();

schemaPassword
.is().min(6)                                    // Minimum length 8
.is().max(16)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);

var schema = new Schema({
    email : {type:String, require:[true,'Please enter email'],validate:[isEmail,'Please enter a valid email']},
    firstName: {type:String, require:[true,'Please enter a name']},
    lastName:{type:String,require:true},
    password:{type:String, require:[true,'please enter password'],minlength:[6,'Please enter a minimum of six characters']},
    passwordResetToken:{type:String, require:true},
    passwordResetExpires:{type:Date, require:true},
    postCode:{type:String,require:true},
    houseNumber:{type:String,require:true},
    phoneNumber:{type:Number,require:true},
    isVerified:{type:Boolean,default:false},
    dob:{type:Date,require:true},
    city:{type:String,require:true},
    creation_dt:{type:Date, require:true}
});


schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User',schema);



