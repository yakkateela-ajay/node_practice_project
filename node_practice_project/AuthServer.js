
var bodyParser = require('body-parser')
const express = require("express");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//defining routes for authentication & autherization
const authRouter=require("./Fligital-Lite/auth/AuthRouter")
app.use("/auth",authRouter)

//////////////////////////////////////////////////
app.listen(3000,()=>{
    console.log("auth server-up and running..")
})