const { isValidObjectId } = require('mongoose');
const { updateOne, update, findOneAndDelete, findOne } = require('../models/user');
const member = require('../models/user');
const {ObjectId} = require('mongodb');
var bcrypt = require('bcrypt');



async function deleteAccount(req, res) {

    var update = req.body.update;
    const filter = req.body.userId;

    console.log(update);
    console.log(filter);

    member.findOne(filter, function (err, user) {

        if (err) {
            return res.status(403).send({ message: "Error please try again later !!!" })
        }

        if (user) {

         

            if (bcrypt.compareSync(update.password, user.password)){

                member.findByIdAndDelete(filter, function (err, user) {
                    if (err) {
                        return res.status(403).send({ message: "Error please try again later !!!" })
                    }

                    else {

                        console.log('out of here gone billionaire');
                        return res.status(200).send({ message: "user deleted" })
                    }
                });
            }


            else{


                console.log("wrong password")
                return res.status(403).send({ message: "Please Enter the correct password" })

            }

            
            }
      
        

        else {
            return res.status(403).send({ message: "Cannot find user please try again later !!!" })
        }
    })
}

module.exports = {
  deleteAccount
}