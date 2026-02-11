
const BankAccounts = require('../model/bank.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();




const registerAccount = async (req, res) => {
    const { fullname, email, password, role, location } = req.body;

    if (!req.body) {
        return res.status(400).send({ response: "missing user data" });
    }

    const hashpassword = bcrypt.hashSync(password, 8);

    try {
        const newuser = await BankAccounts.create({
            fullname,
            email,
            password: hashpassword,
            location
        });
        return res.status(201).send({ response: `Account  created successfully for user ${newuser.fullname} and account number is ${newuser.account_id}` });

    } catch (error) {
        return res.status(500).send({ response: " error in registerAccount " })

    }
}

const loginUserBank = async (req, res) => {

    console.log(req.body)
    try {
        const { email, password } = req.body;

        const user = await BankAccounts.findOne({
            where: {
                email: email
            }
        });
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordMatch) {
            return res.json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                account_id: user.account_id,
                fullname: user.fullname,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
     


        res.status(200).send({ msg:"Bank Account login successfully",token });
    } catch (e) {

        res.status(401).send({ msg: " error in login api" });
    }
};

const  updatedUserProfile = async (req,res)=>{

  const {fullname,location,email} = req.body;


  const exituser = await AdminUser.update({
    fullname,
    location,
    email
   
  }

,
    {
      where:{
        email
      }
    }
  );
  //  console.log(exituser)
  if(!exituser) {
    res.send("user not found")
  }

  res.send("updated user successfully")

}


module.exports = {
    registerAccount,
    loginUserBank,
    updatedUserProfile

}