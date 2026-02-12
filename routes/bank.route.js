

const { registerAccount,
       loginUserBank,
     getaccountbyId,
getAllAccounts,
logoutUserBank,
deleteAccount,
depositmoney,
sendMoney,
updatedUserProfile} = require('../controller/bank.controller')
const _ = require('lodash');


const  express = require('express')
const router = express.Router(); 
const {JwtVerify,adminOnly} = require('../middleware/authBank.middleware');
const BankAccounts = require('../model/bank.model');


router.post('/register', registerAccount);

router.post('/login', loginUserBank);

router.get('/getallaccount',JwtVerify,adminOnly,getAllAccounts);

router.get('/getaccountbyId/:account_id',JwtVerify,adminOnly,getaccountbyId);

router.post('/updatedUserProfile',JwtVerify,adminOnly,updatedUserProfile);


router.post('/logout', logoutUserBank);



router.post('/deleteAccount/:account_id',JwtVerify,adminOnly,deleteAccount);

router.post('/depositmoney',JwtVerify,adminOnly,depositmoney);

router.post('/sendmoney',JwtVerify,sendMoney);

// sendMoney



// router.get('/profile', async (req, res) => {
//   const users = await BankAccounts.findAll()

//   const safeUser = _.map(users, (user)=> _.omit(user,['password']))

//   res.json(safeUser)
// })


module.exports = router; 