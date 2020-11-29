var passport = require('passport');
const jwt = require('jsonwebtoken');

function authentication(req,res,next) {
    passport.authenticate('local',{session: false}, (err, user, info) => {
    if (err) { return res.status(501).json(err); }

    if (!user) { return res.status(501).json(info); }

    req.logIn(user,{session: false}, (err) => {
      if (err) 
      { return res.status(501).json(err); }
     
      const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '24h'

      });
      return res.status(200).json({user,token});
      
    });

  })(req, res, next);
}
  module.exports = {
      authentication
  }