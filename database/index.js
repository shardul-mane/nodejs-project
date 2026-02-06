// dotenv.config();
// require('dotenv').config();
// const Category = require('../model/category.model.js');
// const CategoryA = require('../model/category.model.js');
// const UserA = require('../model/user.model.js');

const Sequelize = require('sequelize');
// const dotenv = require('dotenv');








// const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
//     host:process.env.localhost,
//     dialect:'mysql'
// });
// const temp = process.env.DATABASE_NAME;
// console.log("the database name is :",temp);

const sequelize = new Sequelize('users','root','acc@1234',{
    host:'localhost',
    dialect:'mysql',
    logging:false,
});


async function connection(){
try {

      await sequelize.authenticate();
    //  console.log(result)
    console.log("database is connected successfully")
    
} catch (error) {
    console.log("the error is :",error)
    
}
}
connection();


// associations example of one to one association between user and contact model

// UserA.hasOne(Contact);
// ContactA.belongsTo(User);

// UserA.hasOne(CategoryA, {
//   foreignKey: 'user_Id',
//     as: 'contact'
// });
// ContactA.belongsTo(UserA, {
//     foreignKey: 'user_Id',
//     as:"userpp"
// });


module.exports = sequelize;