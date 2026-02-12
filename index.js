require('dotenv').config();// const User = require('./model/user')
const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./model/user.model');
const Category = require('./model/category.model');
const bodyParser = require('body-parser');
const { checkroleUser } = require('./helper/scope');
const { oneTomanyandoneToone,getalluser, adduser, deleteuser ,updateuser,getusersfullnameandrole,getuserbyid,bulkcreateusers,modelqueryexample} = require('./controller/user.controller');
const { bulkcreatecatgory,getallcategory,getcategorybyid,addcategory,deletecategory} = require('./controller/category.controller');
const { addcontact } = require('./controller/contact.controller');
const {createadmin,loginuser,updateadmin} = require('./controller/AdminUser.controller')
const Contact = require('./model/contact.model');
const {registerAccount,loginUserBank} =require('./controller/bank.controller')
const { Op, where } = require("sequelize");
const cookieParser = require('cookie-parser');


const  userrouter = require('./routes/bank.route')
// const dotenv= require('dotenv');
// dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());

// app.use(cors({
//    origin:"*",
//    allowedHeaders:"*"
// }))


const corsOptions = {
  origin: '*', // Change to your frontend's URL
//   methods: ['GET', 'POST'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

const temp = process.env.DATABASE_NAME;
console.log("the database name in index.js is :",temp);


app.get('/', function (req,res){
   res.send("hi from  server ")
});

app.get('/p', function (req,res){
   res.send("hi pp")
});




/// admin routes 

// app.post('/admin',createadmin);


// app.post('/login',loginuser)

// app.patch('/updateadmin',updateadmin)


// Bank API

// app.post('/bank',registerAccount);
app.use('/bank',userrouter)


// app.post('/bank/log',loginUserBank);
























// app.get('/test', async function (req,res){
//    console.log("test api called")
//    const user = await User.findAll({
//       attributes:['fullname','role'],
//       include: {
//          model: Contact,
//          as: 'contactInfo',
//          attributes: ['currentaddress','permanentaddress']
//       },
//       // where: {
//       //    id : 24
//       // },
//       exclude :['createdAt','updatedAt']
//    });
//    res.send(user);
// });


// // // create contact api

// app.post('/addcontact', addcontact);


// // //  get all users
// app.get('/getalluser', getalluser);

// // //test api for model query example

// app.get('/model', modelqueryexample);

// // // get user by id
// app.get('/:id',getuserbyid);

// // app.('/adduser',adduser);
// app.post('/adduser', adduser);

// // //delete user
// app.delete('/deleteuser/:id',deleteuser);

// // //Update data using patch method
// app.patch('/updateuser/:id',updateuser)

// // // get all users fullname and role. getuserandrole

// app.get('/getuserandrole',getusersfullnameandrole);

// // get user by id
// app.get('/getuserbyid/:id',getuserbyid);

// // Category all API HERE 

// //add category
// app.post('/addcategory',addcategory);

// // get category by id
// app.get('/getcategorybyid/:id',getcategorybyid);

// //creates catgory in bulk by giveing in array 
// // app.post('/createcategoryinbulk',bulkcreatecatgory)

// // get all category
// app.get('/getallcategory',getallcategory);


// //delete category
// app.delete('/deletecategory/:id',deletecategory);

// // scope example api for user with role as admin only
// app.get('/getdeletedcategory', async (req,res)=>{
//    console.log("get deleted category api called")
//    Category.addScope('deletecategory',(destroyTime)=>{
//       return {
//          paranoid: false,
//          where:{
//             destroyTime: {
//       [Op.not]: null
//     }
//          },
//          // attributes:
//       }
//    })
//    // const admin = await User.scope({ method: ['checkrole', 'admin'] }).findAll();
//    const deletedCategory = await Category.scope('deletecategory').findAll();
   
   
   
//    res.send(deletedCategory);
// })



// assotions api list here


// working on one to one  and has many also association between user and category and contacts table 
// when hit this url i have to give all info of user and category and contact info also using single api u can make entries in three tables also and get info from three tables also

// app.post('/hasone-hasmany',oneTomanyandoneToone);



// custom api for Task 

// app.post('/listapi',  async function (req,res){

//     const [first, second] = req.body.attribute;
//     console.log(first)
//       const search = req.body.search;
//       const listdata =  req.body;
//       const offset = Number((listdata.page - 1) * listdata.limit);
//       const limit = Number(listdata.limit);
//       console.log("the list api data received is :",listdata);
//      const result = await User.findAll({
        
//         offset: offset,
//         limit: limit,
//         order: [['createdAt', 'asc']],
//         attributes:[first,second],
//         include: [{
//            model: Contact,
//            as: 'contactInfo',
//          //   attributes: ['categoryName','categoryId']
//          attributes: { exclude: ['createdAt', 'updatedAt','user_Id'] },
//           }],
//        where: {
//          fullname: {
//             [Op.like]: `${search}%`
//          },
//          id: {
//             [Op.between]: [offset,limit] // Range operator
//            }
//       },
//    })
// res.send(result);

// })


//testing api for like opeator in sequelize
// app.get('/like', async (req,res)=>{
//    console.log("like operator api called")
//    const result = await User.findAll({
//       where: {
//          fullname: {
//             [Op.like]: 'A%'
//          }
//       }
//    })
//    res.send(result);
// })



// app.post('/createassociation',async function (req,res){

//       const userdata = req.body;
//     const newuser = await Contact.create({
//          currentaddress:userdata.currentaddress,
//          permanentaddress:userdata.permanentaddress,
//          userInfo:{
//             fullname: userdata.fullname,
//             email: userdata.email,
//             phonenumber: userdata.phonenumber,
//             location: userdata.location,
//             role: userdata.role,
//          }
//       },
//       {
//          include:[ usercontact]

//          }

//       )
//       console.log("the user data is :",newuser);

//       const result = await User.findAll({
//          include:{
//             model: Contact,
//             as: 'contactInfo'
//          }
//       })
//       res.send(result);

// })











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