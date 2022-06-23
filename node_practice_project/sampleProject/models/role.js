//const sequelize= require("../../db_config/database")
//const Sequelize= require("sequelize")

const sequelize= require("../../db_config/database").sequelize;
const Sequelize = require("sequelize");

const Role=sequelize.define("role",{

 ID:{
     type:Sequelize.INTEGER,
     autoIncrement:true,
     allowNull:false,
     primaryKey:true
 },

 ROLE_NAME:{
    type:Sequelize.STRING,
    allowNull:false
 },

 ROLE_DESC:{
    type:Sequelize.STRING
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
   tableName: 'role',
   timestamps: false // disable the automatic adding of createdAt and    updatedAt columns
}

);

module.exports=Role