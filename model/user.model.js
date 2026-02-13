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

const { DataTypes } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require("../database/index.js");
const Category = require("../model/category.model.js");
const Contact = require("../model/contact.model.js");
// const User = require('../model/user.model.js');

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Model attributes are defined here
    fullname: {
      type: DataTypes.STRING(),
      allowNull: false,
      // example of getter method
      get() {
        const rawValue = this.getDataValue("fullname");
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },

      // allowNull defaults to true
    },
    phonenumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    paranoid: true,

    // If you want to give a custom name to the deletedAt column
    deletedAt: "destroyTime",
    // // Other model options go here
    tableName: "users_table",
  },
);
// User.
User.sync()
  .then(() => {
    console.log("users_table table created successfully");
  })
  .catch((err) => {
    console.log("the error is :", err);
  });

// User.associate = (models) => {
//   User.hasOne(models.Contact, {
//     foreignKey: 'user_Id',
//     as: 'assotionfromuserInfo',
//   })
// }

// Contact.associate = (models) => {
//   Contact.belongsTo(models.User, {
//     foreignKey: 'user_Id',
//     as: 'assotionfromuserInfo',
//   });
// }

User.hasOne(Contact, {
  foreignKey: "user_Id",
  as: "contactInfo",
});
const usercontact = Contact.belongsTo(User, {
  foreignKey: "user_Id",
  as: "userInfo",
});

User.hasMany(Category, {
  foreignKey: "user_Id",
  as: "categoryInfo",
});
Category.belongsTo(User, {
  foreignKey: "user_Id",
  as: "userInfo",
});

// User.associate = (models) => {
//   User.hasMany(models.Category, {
//     foreignKey: 'user_Id',
//     as: 'categoryInfo',
//   });
// }

module.exports = User;

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
