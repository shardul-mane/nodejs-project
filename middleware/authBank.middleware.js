const jwt = require("jsonwebtoken");
const AdminUser = require("../model/adminUser.model");
require("dotenv").config();

exports.JwtVerify = async (req, res, next) => {
  // take cookies from req
  // verify it with jwt
  // decode the id and find in db  that id and take user
  // which we will set as re.user = user
  //next()

  const token =
    req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.send("Unauthorize token");
  }
  const verfiydone = jwt.verify(token, process.env.JWT_SECRET);

  if (!verfiydone) {
    res.status(401).send("token is not valid");
  }

  req.user = verfiydone;
  // console.log({first:req.user,verfiydone})
  next();
};

exports.adminOnly = async (req, res, next) => {
  // take token
  //verfiy it
  // decode it and see the role if it admin then only proceeed to next
  console.log("request mutation user : ", req.user);

  if (req.user.role == "Admin") {
    next();
  } else {
    return res.send("This Route is only access by Admin");
  }
};

// module.exports = JwtVerify;
