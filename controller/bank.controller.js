const BankAccounts = require("../model/bank.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
 const _ = require('lodash');
const { col } = require("sequelize");

const registerAccount = async (req, res) => {
  const { fullname, email, password, role, location } = req.body;
 
// let safeData = _.pick(req.body, ['fullname', 'email', 'password', 'role', 'location']);
// // Result: One "clean" object ready for Sequelize.
// safeData = _.defaults(safeData, { role: 'User', balance: 0 });
// console.log(safeData)
//   return await BankAccounts.create(safeData);

  if (!req.body) {
    return res.status(400).send({ response: "missing user data" });
  }

  const hashpassword = bcrypt.hashSync(password, 8);

  try {
    const newuser = await BankAccounts.create({
      fullname,
      email,
      password: hashpassword,
      location,
      role,
    });
    return res
      .status(201)
      .send({
        response: `Account  created successfully for user ${newuser.fullname} and account number is ${newuser.account_id}`,
      });
  } catch (error) {
    return res.status(500).send({ response: " error in registerAccount " });
  }
};

const loginUserBank = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const user = await BankAccounts.findOne({
      where: {
        email: email,
      },
    });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        account_id: user.account_id,
        fullname: user.fullname,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json({
        message: `Bank Account login successfully for account number ${user.account_id}`,
      });

    // res.status(200).send({ msg:"Bank Account login successfully",token });
  } catch (e) {
    res.status(401).send({ msg: " error in login api" });
  }
};

const updatedUserProfile = async (req, res) => {
  console.log("gerfgsgfgsfg", { fullname: req.user.fullname });

  const { fullname, location, account_id } = req.body;

  const exituser = await BankAccounts.update(
    {
      fullname,
      location,
    },
    {
      where: {
        account_id,
      },
    },
  );
  //  console.log(exituser)
  if (!exituser) {
    res.send("user not found");
  }

  res.json({ msg: ` user updated  successfully` });
};

const getAllAccounts = async (req, res) => {
  try {
    //   console.log("get all users called")
    const allaccount = await BankAccounts.findAll();
    //   console.log("all all account are :", allaccount);
    // console.log("all users are :", allusers);
    res.status(200).send(allaccount);
  } catch (error) {
    res.json({ msg: "error is ", error });
  }
};

const getaccountbyId = async (req, res) => {
  // console.log("get user by id api called with id :",req.params.id);
  if (!req.params.account_id) {
    return res.status(400).send({ response: "missing user id in params" });
  }

  try {
    const user = await BankAccounts.findOne({
      attributes: {
        exclude: ["password", "updatedAt", "createdAt", "destroyTime"],
      },
      where: {
        account_id: req.params.account_id,
      },
    });
    res.status(200).send(user);
  } catch (error) {
    return res.send("error in getaccountbyId api ");
  }
};
const logoutUserBank = async (req, res) => {
  res.clearCookie("token", { httpOnly: true, path: "/", secure: true });
  res.send("Cookie cleared successfully");
  //   return res.send(req.user);
};

const deleteAccount = async (req, res) => {
  if (!req.params.account_id) {
    return res
      .status(400)
      .send({ response: "missing account number id in params" });
  }
  try {
    await BankAccounts.destroy({
      where: {
        account_id: req.params.account_id,
      },
    });
    res.send({ response: " Account deleted sucessfully", id: req.params.id });
  } catch (error) {
    return res.json({ msg: "the error is : " }, error);
  }
};

const depositmoney = async (req, res) => {
  const { account_id, Amount } = req.body;

  try {
    const useris = await BankAccounts.findByPk(account_id);
    const exituser = await BankAccounts.update(
      {
        balance: Amount + useris.balance,
      },
      {
        where: {
          account_id,
        },
      },
    );
    //  console.log(exituser)
    if (!exituser) {
      res.send("user not found");
    }

    return res.json({ msg: ` money added successfully` });
  } catch (error) {
    return res.send("error in deposit money");
  }
};

const sendMoney = async (req, res) => {
  // user have some money min  1 rs to make transaction
  // he have to give other person accound id and amount
  // amout by put by user  we have check with balaence it should be more

  // we are taking user account number from cookies
  const sender_accountNumber = req.user.account_id;
  console.log("dfnakfhwkgkw", sender_accountNumber);
  //  console.log("dfnakfhwkgkw",req.user.balance);
  const { reciver_accountNumber, Amount } = req.body;
  if (Amount <= 0) {
    return res.send("amount should be  more then 0");
  }
  try {
    const senderUser = await BankAccounts.findByPk(sender_accountNumber);
    console.log(senderUser);
    const reciverUser = await BankAccounts.findByPk(reciver_accountNumber);
    if (senderUser.balance <= 0) {
      return res.send("your account balaence is 0 ");
    }

    if (senderUser.balance <= Amount) {
      return res.json({
        msg: ` your amount  is bigger then balaence and balaence`,
      });
    }

    console.log(senderUser.balance);
    const remainingBalaence = senderUser.balance - Amount;
    console.log(remainingBalaence);
    await BankAccounts.update(
      {
        balance: remainingBalaence,
      },
      {
        where: {
          account_id: senderUser.account_id,
        },
      },
    );

    const reciverbalance = Amount + reciverUser.balance;
    await BankAccounts.update(
      {
        balance: reciverbalance,
      },
      {
        where: {
          account_id: reciverUser.account_id,
        },
      },
    );

    return res.send("money send successfully");
  } catch (error) {
    return res.send("error in send money api");
  }
};

module.exports = {
  registerAccount,
  loginUserBank,
  updatedUserProfile,
  getAllAccounts,
  getaccountbyId,
  logoutUserBank,
  deleteAccount,
  depositmoney,
  sendMoney,
};
