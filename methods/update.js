const { isValidObjectId } = require('mongoose');
const { updateOne, update } = require('../models/user');
const member = require('../models/user');
const {ObjectId} = require('mongodb');
var bcrypt = require('bcrypt');

async function user(req,res)
{
  var update = req.body.update;
  const filter = req.body.userId;

  var key = Object.keys(update);

  if (key[0] === "password")
  {
    var hashPassowrd = bcrypt.hashSync(update.password,10)

    update = {"password":hashPassowrd}
  
  }

member.findOneAndUpdate(filter,update,{new:true},(err, update) => {
    if (err)
    {
        return res.status(403).send({message:"Error saving changes try again !!!"})
    }

    else
    {
        return res.status(200).send({update})
    }

  });
}

module.exports = {
  user
}