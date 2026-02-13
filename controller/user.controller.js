// const { response } = require('express');
const Category = require("../model/category.model");
const Contact = require("../model/contact.model");
const User = require("../model/user.model");
const { Op } = require("sequelize");

const getalluser = async (req, res) => {
  console.log("get all users called");
  const allusers = await User.findAll();
  console.log("all users are :", allusers);
  // console.log("all users are :", allusers);
  res.send(allusers);
};

const getusersfullnameandrole = async (req, res) => {
  console.log("get users fullname and role api called");
  const users = await User.findAll({
    attributes: ["fullname", "role"],
    include: [
      {
        model: Contact,
        as: "contactInfo",
        attributes: ["currentaddress", "permanentaddress"],
      },
    ],
    //         where: {
    //     // id: [1, 2, 3], // Same as using `id: { [Op.in]: [1,2,3] }`

    //     id : {[Op.in]:[23,14,7]}
    //   },
  });
  res.send(users);
};

const getuserbyid = async (req, res) => {
  console.log("get user by id api called with id :", req.params.id);
  if (!req.params.id) {
    return res.status(400).send({ response: "missing user id in params" });
  }
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  console.log("#####################################");

  console.log("user", user);

  console.log("#####################################");

  res.send(user);
};

//  controller to add user in database

const adduser = async (req, res) => {
  // here we add destructuring from body and check all fileds should be there
  const userdata = req.body;
  const { fullname, email, phonenumber, location, role } = req.body;
  if (!userdata) {
    console.log("missing user data");
    return res.status(400).send({ response: "missing user data" });
  }

  const newuser = await User.create(userdata);
  // console.log("the new user created is :",newuser);

  res.status(201).send({ response: "user created successfully" });
};

// oneto one and one many both same time  association example
const oneTomanyandoneToone = async (req, res) => {
  const data = req.body;
  console.log("the data received in one to one and one to many api is :", data);
  const userinfo = await User.create({
    fullname: data.fullname,
    email: data.email,
    phonenumber: data.phonenumber,
    location: data.location,
    role: data.role,
  });
  if (userinfo.id) {
    console.log("user created successfully with id :", userinfo.id);
    categoryinfo = await Category.create({
      categoryName: data.categoryName,
      categoryId: data.categoryId,
      user_Id: userinfo.id,
    });
    console.log("default category created for user id :", userinfo.id);
  }

  if (userinfo.id) {
    console.log("user created successfully with id :", userinfo.id);
    contactinfo = await Contact.create({
      currentaddress: data.currentaddress,
      permanentaddress: data.permanentaddress,
      user_Id: userinfo.id,
    });
    console.log("default contact created for user id :", userinfo.id);
  }

  res.send(
    `user is created and  contact table have there contact  id  ${contactinfo.id} and  category table have there category id  ${categoryinfo.id} for  info user id is ${userinfo.id}`,
  );
};

const updateuser = async (req, res) => {
  if (!req.params.id) {
    return res.send({ response: "misssing user id in prams" });
  }
  const updateduserdata = req.body;
  await User.update(updateduserdata, {
    where: {
      id: req.params.id,
    },
  });
  res.send({ response: `user data updated successfully ${req.params.id}` });
};
const deleteuser = async (req, res) => {
  console.log("delete user api called with id :", req.params.id);
  if (!req.params.id) {
    return res.status(400).send({ response: "missing user id in params" });
  }
  await User.destroy({
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    console.log("the error is :", err);
    return res.status(500).send({ response: "internal server error" });
  });
  res.send({ response: "user deleted sucessfully", id: req.params.id });
};

// Specifying attributes for SELECT queries

const modelqueryexample = async (req, res) => {
  console.log("model query example route called");
  res.send("model query example route ww");
};

const bulkcreateusers = async (req, res) => {
  const usersarray = req.body;
  if (usersarray.length > 1 || !Array.isArray(usersarray)) {
    return res
      .status(400)
      .send({ response: "please provide array of users data" });
  }
  await User.bulkCreate(usersarray);
  res.status(201).send({ response: "users created successfully in bulk" });
};

const createAssociation = async (req, res) => {
  const userdata = req.body;
  awai;
};

// working on this api  i have to add  relation in database one to one
//  const oneToone = async (req,res)=>{
//     const {id} = req.params;
//     const userwithcategory = await User.findByPk(id,{include:Category});
//     if(!userwithcategory){
//         return res.status(404).send({response:"user not found"});
//     }
//     res.send(userwithcategory);
//  };

module.exports = {
  getalluser,
  getuserbyid,
  adduser,
  deleteuser,
  updateuser,
  getusersfullnameandrole,
  bulkcreateusers,
  modelqueryexample,
  oneTomanyandoneToone,
};
