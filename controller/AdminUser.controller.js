const AdminUser = require("../model/adminUser.model");
// const adminUser= require('../model/adminUser.model')
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const createadmin = async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, password, role } = req.body;

  // if(!req.body) return "please mention the details";

  //    if(first_name && password && email ){
  //        return "info must have first name and password and email";
  //    }
  const hashpassword = bcrypt.hashSync(password, 8);
  console.log("rjwkerhjfekwjhtkerwhgkhekthrjwek", hashpassword);

  const usercreated = await AdminUser.create({
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(password, 8),
    role: req.body.role,
  });
  // const user = await AdminUser.create(req.body)

  // res.send(`user created with id ${usercreated.id}`)
  res.status(201).send({ response: "adminuser created successfully" });
};

// const logout

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await AdminUser.findOne({
      where: {
        email: email,
      },
    });

    console.log(user.first_name);

    if (!user) {
      return res.json({
        message: "user not found in db",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({
        message: "Invalid email or password",
      });
    }
    //   const JWT_SECRET= "new";
    const token = jwt.sign(
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    console.log(user.id);

    refreshToken.toString();

    await AdminUser.update(
      {
        token: refreshToken,
      },
      {
        where: {
          email: req.body.email,
        },
      },
    );

    //   console.log(useris)

    // if (user) {
    //   user.token = refreshToken;
    //   await user.save();
    //   console.log("database updated for refresh token");
    // }
    console.log("JWT TOKEN:", token);

    console.log("JWT  refresh TOKEN:", refreshToken);

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.json({
      message: "Internal server error",
    });
  }
};

// const logout = async (req,res)=>{

//     const user

// }

const updateadmin = async (req, res) => {
  const { first_name, last_name, email } = req.body;

  // if(email){

  // }

  const exituser = await AdminUser.update(
    {
      first_name,
      last_name,
      // email. for we have check duplicated from db  and for role that is fixed
    },

    {
      where: {
        email,
      },
    },
  );
  //  console.log(exituser)
  if (!exituser) {
    res.send("user not found");
  }

  res.send("updated user successfully");
};

module.exports = {
  createadmin,
  loginuser,
  updateadmin,
};
