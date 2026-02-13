

const addCard = require('../controller/cards.controller')



const express = require("express");
const router = express.Router();
const { JwtVerify} = require("../middleware/authBank.middleware");
// const BankAccounts = require("../model/bank.model");
// const  validate = require('../middleware/userValidation.middleware')
// const userSchemaValidation= require('../validation/user.Validation.Schema')
// router.post("/register", validate(userSchemaValidation),registerAccount);




router.post("/apply", JwtVerify,  addCard);



module.exports = router;