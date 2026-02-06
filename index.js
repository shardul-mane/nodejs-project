require('dotenv').config();// const User = require('./model/user')
const express = require('express');
const app = express();
const User = require('./model/user.model');
const Category = require('./model/category.model');
const bodyParser = require('body-parser');
const { oneTomanyandoneToone,getalluser, adduser, deleteuser ,updateuser,getusersfullnameandrole,getuserbyid,bulkcreateusers,modelqueryexample, oneToone1} = require('./controller/user.controller');
const { bulkcreatecatgory,getallcategory,getcategorybyid,addcategory,deletecategory} = require('./controller/category.controller');
const { addcontact } = require('./controller/contact.controller');
const Contact = require('./model/contact.model');
// const dotenv= require('dotenv');
// dotenv.config();
app.use(bodyParser.json());

const temp = process.env.DATABASE_NAME;
console.log("the database name in index.js is :",temp);


app.get('/', function (req,res){
   res.send("hi from  vdsmv server ")
});

app.get('/p', function (req,res){
   res.send("hi pp")
});

// // create contact api

// app.post('/addcontact', addcontact);


// //  get all users
// app.get('/getalluser', getalluser);

// //test api for model query example

// app.get('/model', modelqueryexample);

// // get user by id
// app.get('/:id',getuserbyid);

// app.('/adduser',adduser);
// app.post('/adduser', adduser);

// //delete user
// app.delete('/deleteuser/:id',deleteuser);

// //Update data using patch method
// app.patch('/updateuser/:id',updateuser)
// // get all users fullname and role. getuserandrole

// app.get('/getuserandrole',getusersfullnameandrole);

// get user by id
// app.get('/getuserbyid/:id',getuserbyid);

// Category all API HERE 

//add category
// app.post('/addcategory',addcategory);

// get category by id
// app.get('/getcategorybyid/:id',getcategorybyid);

//creates catgory in bulk by giveing in array 
// app.post('/createcategoryinbulk',bulkcreatecatgory)

// get all category
// app.get('/getallcategory',getallcategory);


//delete category
// app.delete('/deletecategory/:id',deletecategory);



// assotions api list here


// working on one to one  and has many also association between user and category and contacts table 
// when hit this url i have to give all info of user and category and contact info also using single api u can make entries in three tables also and get info from three tables also
app.post('/hasone-hasmany',oneTomanyandoneToone);

app.post('/listapi',  async function (req,res){
      const listdata =  req.body;
      const offset = Number((listdata.page - 1) * listdata.limit);
      const limit = Number(listdata.limit);;
     const result = await User.findAll({
        offset: offset,
        limit: limit,
        order: [['createdAt', 'asc']],
  

        attributes:['fullname','role'],
         include: [{
           model: Contact,
           as: 'contactInfo',
         //   attributes: ['categoryName','categoryId']
         attributes: { exclude: ['createdAt', 'updatedAt','user_Id'] }

         }]



   //    where: {
   //  [Op.or]: [
   //    sequelize.where(sequelize.fn('id', sequelize.col('content')), 7),
   //    {
   //      content: {
   //        [Op.like]: 'Hello%',
   //      },
   //    }
   //   ] }    },
   //   {
   //    include: [
   //      {
   //        model: [Category,Contact],
          
   //        as: 'unserInfo',
   //      },
   //    ] 
   },
     
   
   )



res.send(result);

})









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


// creating a user
// const user1 = User.build({ fullname: 'Alice Johnson', email: 'alice.j@example.com',phonenumber:14567890,location:'UK' });
// console.log(user1 instanceof User); // true
// console.log(user1.fullname); 
//  user1.save();
// console.log('User was saved to the database!');


//this for category table creation ADDED in catgory model
// Category.sync();

// creating a category using build method
// const category1 = Category.build({ categoryName: 'KIDS', categoryId: '1857' });

// console.log("the category created is:",category1)
// category1.save();
// //  category1.save();


// making another category with create method
// const category2 = Category.create({ categoryName: 'Home & Kitchen', categoryId: '8910' });
// console.log("category2 created is:",category2);


 // dropping the user table
// User.drop();







app.listen(8000,()=>{
    console.log(`server is running on port http://localhost:8000`);
})