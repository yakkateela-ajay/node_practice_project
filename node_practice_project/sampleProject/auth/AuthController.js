require('dotenv').config()
const User = require("../models/user");
const jwt= require('jsonwebtoken');

//acts like cache.. to store refresh tokens
let refToken=[]

//generate JWT for logged user
exports.generateJwtAndLogin = (req, res) => {
    
    const userId = req.body.id;
    const user= {id:userId}
    console.log("came to auth controller "+userId);

    //checking is user exited with given credentials
    User.findByPk(userId)
    .then(data => {
      if (data) {

        //user existed, so we can create JWT token
        const accessToken =jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
        const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
        refToken.push(refToken);
        res.json({accessToken:accessToken,refreshToken:refreshToken})

      } else {
        res.status(404).send({
          message: `Cannot find User with id=${userId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + userId
      });
    });

  };


  exports.reGenerateJWTbasedOnRefreshTokn = (req,res) =>{
    const r=req.body.refeshToken;
    if(r==null) return res.sendStatus(400)
    if(refToken.includes(r)){
      jwt.verify(r,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        const newJwtToken =jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
        const newRefreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
        refToken.push(newRefreshToken);
        res.json({accessToken:newJwtToken,refreshToken:newRefreshToken});
      })
    }
    else{
      res.sendStatus(403);
    }
  }
