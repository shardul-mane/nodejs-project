

const { Sequelize} = require('sequelize');


const sequelize = new Sequelize('project','root','xyz@123',{
    host:'localhost',
    dialect:'mysql'
});

try {

    await sequelize.authenticate();
    console.log("database is connected successfully")
    
} catch (error) {
    console.log("the error is :",error)
    
}

module.exports = sequelize;