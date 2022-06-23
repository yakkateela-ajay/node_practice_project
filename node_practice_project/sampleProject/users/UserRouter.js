
    const user = require("./UserController");
    const authService= require("../auth/AuthService")
    var router = require("express").Router();
  
    // add new user
    router.post("/", user.addUser);
  
    // get a user
    router.get("/:id", authService.authenticateToken,user.findUserByUserId);

    // view all active users
    router.get("/", authService.authenticateToken,user.findAll);


    module.exports=router