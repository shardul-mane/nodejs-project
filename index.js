

const express = require('express');
const app = express();
// const User = require('./model/user')
const User = require('./model/user.model');
const Category = require('./model/category.model');
const bodyParser = require('body-parser');
// const dotenv= require('dotenv');
// dotenv.config();
require('dotenv').config();
const temp = process.env.DATABASE_NAME;
console.log("the database name in index.js is :",temp);

app.use(bodyParser.json());







app.get('/', function (req,res){
   res.send("hi from  vdsmv server ")
});


app.get('/adduser', function (req,res){
   res.send("add user page ")
});


// console.log("the database name from env file is :",process.env.DATABASE_NAME);
// User.sync({force:true}).then(()=>{
//     console.log("table created successfully")
// }).catch((err)=>{
//     console.log("the error is :",err)
// });



// use in model of user
// User.sync().then(()=>{
//     console.log("table created successfully")
// }).catch((err)=>{
//     console.log("the error is :",err)
// });



const user1 = User.build({ fullname: 'Alice Johnson', email: 'alice.j@example.com',phonenumber:14567890,location:'UK' });
console.log(user1 instanceof User); // true
console.log(user1.fullname); 
 user1.save();
console.log('User was saved to the database!');


//this for category table creation ADDED in catgory model
// Category.sync();

const category1 = Category.build({ categoryName: 'KIDS', categoryId: '1857' });

console.log("the category created is:",category1)
category1.save();
//  category1.save();


// making another category with create method
const category2 = Category.create({ categoryName: 'Home & Kitchen', categoryId: '8910' });
console.log("category2 created is:",category2);



// User.drop();







app.listen(8000,()=>{
    console.log(`server is running on port http://localhost:8000`);
})