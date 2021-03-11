const { isValidObjectId } = require('mongoose');
const { updateOne } = require('../models/user');
const member = require('../models/user');
const {ObjectId} = require('mongodb');

async function user(req,res)
{
  const update = req.body.update;
  const filter = req.body.userId;


  console.log(filter);
  console.log(update);

member.updateOne(filter,update,{new:true},(err, update) => {
    if (err)
    {
        return res.status(403).send({message:"Error saving changes try again !!!"})
    }

    else
    {
        return res.status(200).send({message:"changes saved"})

    }

  });
}

module.exports = {
  user
}