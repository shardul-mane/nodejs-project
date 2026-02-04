const { response } = require('express');
const User =  require('../model/user.model');
const { Op } = require("sequelize");

const getalluser= async (req, res)=>{
    const allusers = await User.findAll();
    // console.log("all users are :", allusers);
    res.send(allusers);
}
const adduser= async (req,res)=>{

    // here we add destructuring from body and check all fileds should be there 
    const userdata = req.body;
    // const {fullname,email,phonenumber,location,role} = req.body;
    // if(!userdata){
    //     console.log("missing user data");
    //     return res.status(400).send({response:"missing user data"});
    // }

    const newuser = await User.create(userdata);
    console.log("the new user created is :",newuser);

    res.status(201).send({response:"user created successfully"});


}
 const updateuser = async (req,res)=>{

    if(!req.params.id){
        return res.send({response:"misssing user id in prams"});
    }
    const updateduserdata = req.body;
    await User.update(updateduserdata,{
        where:{
            id:req.params.id
        }
    })
    res.send({response:`user data updated successfully ${req.params.id}`});
 }
const deleteuser= async(req,res)=>{
    if(!req.params.id){
        return res.status(400).send({response:"missing user id in params"})
    }
     await User.destroy({
        where:{
            id:req.params.id
        }
     })
     res.send({response:"user deleted sucessfully",id:req.params.id})
}


const getusersfullnameandrole =async (req,res)=>{
    const users = await User.findAll({
        // attributes:['fullname','role']
        where: {
    // id: [1, 2, 3], // Same as using `id: { [Op.in]: [1,2,3] }`

    id : {[Op.in]:[23,14,7]}
  },
    })
    res.send(users)
}

const getuserbyid= async (req,res)=>{
    if(!req.params.id){
        return res.status(400).send({response:"missing user id in params"})
    }
    const user = await User.findOne({
        where:{
            id:req.params.id
        }
    });
    res.send(user);
}

// Specifying attributes for SELECT queries

 const modelqueryexample = async (req,res)=>{
    console.log("first")
    res.send("model query example route");
}


const bulkcreateusers= async (req,res)=>{
    const usersarray = req.body;
    if(usersarray.length>1 || !Array.isArray(usersarray)){
        return res.status(400).send({response:"please provide array of users data"})
    }
    await User.bulkCreate(usersarray);
    res.status(201).send({response:"users created successfully in bulk"});
}


    

module.exports = {
    getalluser,
    getuserbyid,
    adduser,
    deleteuser,
    updateuser,
    getusersfullnameandrole,
    bulkcreateusers,
    modelqueryexample
  

};