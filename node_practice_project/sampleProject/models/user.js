
const sequelize= require("../../db_config/database").sequelize;
const Sequelize = require("sequelize");

const User=sequelize.define("user",{

 USER_ID:{
     type:Sequelize.INTEGER,
     autoIncrement:true,
     allowNull:false,
     primaryKey:true
 },

 TENANT_NAME:{
    type:Sequelize.STRING
 },

 PAN_NUMBER:{
    type:Sequelize.STRING
 },

 GSTIN_NUMBER:{
    type:Sequelize.STRING
 },

 LANGUAGE:{
    type:Sequelize.STRING
 },

 PHONE_NUMBER:{
    type:Sequelize.STRING
 },

 EMAIL:{
    type:Sequelize.STRING
 },

 PASSWORD:{
     type:Sequelize.STRING
 },

 FIRST_NAME:{
    type:Sequelize.STRING
 },
  
 LAST_NAME:{
    type:Sequelize.STRING
 },

 ROLE_ID:{
    type:Sequelize.INTEGER
 },

 IS_ACTIVE:{
    type:Sequelize.INTEGER
 },
 
 CREATED_BY:{
     type:Sequelize.INTEGER
 },

 CREATED_DATE:{
     type:Sequelize.DATE
 }

},

{
   tableName: 'user',
   timestamps: false // disable the automatic adding of createdAt and    updatedAt columns
}

);

module.exports=User