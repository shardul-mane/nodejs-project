

const { Sequelize} = require('sequelize');
// const dotenv = require('dotenv');

// dotenv.config();
require('dotenv').config();






// const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
//     host:process.env.localhost,
//     dialect:'mysql'
// });
// const temp = process.env.DATABASE_NAME;
// console.log("the database name is :",temp);

const sequelize = new Sequelize('databases','root','password',{
    host:'localhost',
    dialect:'mysql',
    logging:false,
});


// async function connection(){
try {

     sequelize.authenticate();
    console.log("database is connected successfully")
    
} catch (error) {
    console.log("the error is :",error)
    
}
// }
// connection();


module.exports = sequelize;