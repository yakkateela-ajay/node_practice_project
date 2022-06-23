require('dotenv').config()
const jwt= require('jsonwebtoken');

exports.authenticateToken=(req,res,next)=>{
    console.log("came to middle layer JWT authentication");
    const authHeader=req.headers['authorization']
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    console.log("TOKEN "+token);
    if(token==null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user=user
        next()
    });
}