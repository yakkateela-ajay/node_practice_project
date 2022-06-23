    const user = require("../users/UserController");
    const auth = require("./AuthController");
  
    var router = require("express").Router();
  
    //check if that user exists or not
    router.post("/login",auth.generateJwtAndLogin);

    //generate JWT again after Token expires
    router.post('/token',auth.reGenerateJWTbasedOnRefreshTokn)

    module.exports=router