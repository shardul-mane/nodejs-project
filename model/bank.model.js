

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index');

class BankAccounts extends Model { }


BankAccounts.init(
  {

    account_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname:{
         type: DataTypes.STRING(100),

    },
    email: {
      type: DataTypes.STRING(100),
      validate: {
        isEmail: true,
      }
    },
    password:{
        type:DataTypes.STRING(255)
    },
    role:{
        type: DataTypes.ENUM('Admin','User'),
        defaultValue:'User',
    },
    balance:{
        type:DataTypes.INTEGER,
    defaultValue: 0
    },
    location:{
        type: DataTypes.STRING(100)
    }
  },
  {
    paranoid: true,
    deletedAt: 'destroyTime',
    sequelize, 
    modelName: 'BankAccounts',
    tableName: 'BankAccounts_table', 
  },
);

BankAccounts.sync({force:false}).then(() => {
  console.log('BankAccounts table created successfully');
}).catch((err) => {
  console.log('The error is :', err);
});
module.exports = BankAccounts;


