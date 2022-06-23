
const User = require("../models/user");
const Role = require("../models/role")
const bcrypt= require("bcrypt")


//search a single User with an id
exports.findUserByUserId = (req, res) => {

    const id = req.params.id;
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };

  //////////////////////////////////////////////////////////////
  //User adding
  exports.addUser = async (req,res)=>{

    if(req.body.phoneNumber==null || req.body.phoneNumber==""){
      res.statusMessage = "Phone Number can't be empty or null";
      res.status(400).end();
      return;
    }
    else{
      const ob= await User.findOne({where :{PHONE_NUMBER:req.body.phoneNumber}});
      if(ob!=null && ob.PHONE_NUMBER!=null){
        res.statusMessage = "Phone Number already existed";
        res.status(400).end();
      }
    }

    var roleId=0;
    if(req.body.role==null || req.body.role==""){
      res.statusMessage = "Role must not be empty";
      res.status(400).send(req.body);
      return;
    }
    else{    
      const r= await Role.findOne({where:{ROLE_NAME:req.body.role}});
      if(r!=null && r.ID!=null){
        roleId=r.ID;
      }
      else{
        res.statusMessage = err.message || "Invalid Role";
        res.status(400).end();
      }
    }
    
    var hashedPassword=req.body.password;
    if(req.body.password==null || req.body.password==""){
      res.statusMessage = "Password should not be empty or null";
      res.status(400).end();
      return;
    }
    else{
      //default salt with input 10
      const salt= await bcrypt.genSalt();
      hashedPassword= await bcrypt.hash(req.body.password,salt)
    }

    const user = {
      FIRST_NAME: req.body.firstName,
      LAST_NAME: req.body.lastName,
      PASSWORD:hashedPassword,
      PHONE_NUMBER:req.body.phoneNumber,
      TENANT_NAME: req.body.organizationName,
      LANGUAGE:req.body.language,
      EMAIL:req.body.email,
      PAN_NUMBER:req.body.panNumber,
      GSTIN_NUMBER:req.body.gstNumber,
      IS_ACTIVE:1,
      CREATED_BY:1,
      CREATED_DATE:new Date(),
      ROLE_ID:roleId
    };

    User.create(user).
    then(data=>{
      res.status(201).send(data);
    }).
    catch(err=>{
      res.statusMessage=err.message || " Error occured while creating user."
      res.status(500).end();
    })
  };

  /////////////////////////////////////////////////////////////////
  //get all active users
  exports.findAll= (req,res)=>{
    let users=[]
    users=User.findAll({where :{IS_ACTIVE:1}});
    if(users!=null){
      res.status(200).send(users);
    }
    else{
      res.statusMessage="Unable to fetch users";
      res.status(500).end();
    }
  }