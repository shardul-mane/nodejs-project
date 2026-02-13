

const Cards = require('../model/Card.model');
const crypto = require('crypto');


// const addCard = async (req,res)=>{
   
//   const{cardType} = req.body;
//   const userAccount_id = req.user.account_id;
//   const newCardRequest = await Cards.create({
//       account_id: userAccount_id,
//       cardType,
//       cardId: `REQ-${ crypto.randomUUID().replace(/-/g, '').substring(0, 5)}`, // Temporary request ID
//       cardAmount: 0
//     });
//  return res.status(201).json({
//       message: "Application submitted. Status: Pending Admin Approval.",
//       data: newCardRequest
//     });

// }



const addCard = async (req, res) => {
  try {
    const { cardType } = req.body;
    const userAccount_id = req.user.account_id;

    const newCardRequest = await Cards.create({
      account_id: userAccount_id,
      cardType,
      cardId: `REQ-${crypto.randomUUID().replace(/-/g, '').substring(0, 5)}`,
      cardAmount: 0
    });

    return res.status(201).json({
      message: "Application submitted. Status: Pending Admin Approval.",
      data: newCardRequest
    });
  } catch (error) {
    // THIS LINE IS KEY: It shows the real MySQL error
    console.error("Detailed MySQL Error:", error.parent ? error.parent.sqlMessage : error.message);
    
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.parent ? error.parent.sqlMessage : error.message
    });
  }
};


module.exports = addCard;