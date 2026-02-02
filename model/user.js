
const {DataTypes} = require('sequelize');
const sequelize = require('../database/index');


const user = new sequelize.define(
    'user',{
    fullname:{
        type: DataTypes.STRING
        
    },
    email:{
        type: DataTypes.STRING

    },
    phonenumber:{
        type:DataTypes.NUMBER
    },
    location:{
        type:DataTypes.STRING
    }

},
{
    tableName: "userstable",


})
 console.log(user==sequelize.model.user)





