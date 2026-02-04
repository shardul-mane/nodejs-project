
// // const {DataTypes} = require('sequelize');
// const {sequelize} = require('../database/index.js');
// const {  DataTypes } = require('sequelize');
// // const {sequelizep} = new Sequelize('mysql2::memory:');

// const User = sequelize.define(
//     'User',{
//     fullname:{
//         type: DataTypes.STRING,
//         allowNull:false,
        
//     },
//     email:{
//         type: DataTypes.STRING,
//         allownNull:false,

//     },
//     phonenumber:{
//         type:DataTypes.INTEGER,
//     },
//     location:{
//         type:DataTypes.STRING,
//     }

// },
// {
//     tableName: "users_table",


// });

// module.exports=User;
// //  console.log(user==sequelize.model.user)


const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require('../database/index.js');

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
     phonenumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
        type:DataTypes.STRING,
        allowNull:false,
    },
     role: {
        type:DataTypes.STRING,
       defaultValue:'user',
    },
  },
  {
    // Other model options go here
    tableName: 'users_table',
  },
);
User.sync().then(()=>{
    console.log("users_table table created successfully")
}).catch((err)=>{
    console.log("the error is :",err)
});

module.exports = User;

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true


