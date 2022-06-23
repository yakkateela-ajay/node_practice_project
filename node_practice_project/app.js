
//NodeJs is a backend server/runtime environment which runs on physical machine/node/computer
//NodeJs developed using V8 JS engine
//JS runs on browser
//Browser interprets JS code using java script engine
//Express is a minimal and flexible NodeJs web application framework that provides a robust set of features for web and mobile applications.
//JavaScript is a single-threaded language because while running code on a single thread, it can be really easy to implement as we don't have to deal with the complicated scenarios that arise in the multi-threaded environment like deadlock. Since, JavaScript is a single-threaded language, it is synchronous in nature
//NodeJs is single threaded

/*NodeJs uses non-blocking io to accept multiple requests from client and those request will be assigned to workers (using libuv. implemented in C).
 by using its single thread.Here workers means multiple threads which are provided by system kernal. 
*/

//NodeJs prefered for IO-Intensive (interacting with external systems like databases, file systems etc) rather than CPU Intensive work. because since NodeJs is single threaded CPU operations takes more time with that single thread.
//NPM is a pacakge manager for NodeJs. It enables us to use solution of sub problems which are developed by millions of developes.
//Using NPM we achive Modularity. (Easy to maintain, share and debug)

var bodyParser = require('body-parser')
const cors = require("cors");
const express = require("express");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sample project - Backend!!!" });
});

//Core App Routers Definitions
//For Authorization, we have another server AuthServer.js which runs at localhost:3000
//Core App Server running on localhost:8080
///////////////////////////////////////

//define routes for user module
const userRouter=require("./sampleProject/users/UserRouter");
app.use("/users",userRouter)

//define router for agent load module
const agentRouter= require("./sampleProject/loads/AgentLoads/AgentRouter")
app.use("/load",agentRouter)

//define router for fo load module
//const foLodsRouter= require("./Fligital-Lite/loads/FoLoads/FoRouter")
//app.use("/load-board",foLodsRouter)


//////////////////////////////////////////////////////////
// set port, listen for requests
app.listen(4000,()=>{
    console.log("core app server-up and running..")
})

