

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");
const BankAccounts = require('../model/bank.model')


class Cards extends Model {}




Cards.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cardId: {
      type: DataTypes.STRING(100),
    },
    account_id: {
      type: DataTypes.STRING(100),
    },
    expiryDate: {
      type: DataTypes.DATE,
    },
    cardType: {
      type: DataTypes.ENUM("DebitCard", "CreditCard"),
    },
    status: {
  type: DataTypes.ENUM('PENDING', 'COMPLETED', 'REJECTED'), // Added 'PENDING' here
  defaultValue: 'PENDING'
},
    
    cardAmount:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    }
  },
  {
    paranoid: true,
    deletedAt: "destroyTime",
    sequelize,
    modelName: "Cards",
    tableName: "Cards_table",
    indexes: [
      {
        unique: true,
        fields: ["cardId"],
      },
    ],
  },
);






Cards.sync({alter:true})
  .then(() => {
    console.log("Cards table created successfully");
  })
  .catch((err) => {
    console.log("The error is :", err);
  });

// BankAccounts.hasMany(Cards, {
//   foreignKey: "account_id",
//   as: "cardInfo",
// });
// Cards.belongsTo(BankAccounts, {
//   foreignKey: "account_id",
//   as: "cardInfo",
// });

BankAccounts.hasMany(Cards, {
  foreignKey: "account_id",
  sourceKey: "account_id", // Explicitly link to the account_id column
  as: "cards",             // Plural: user.cards
});

// A Card belongs to one Bank Account
Cards.belongsTo(BankAccounts, {
  foreignKey: "account_id",
  targetKey: "account_id", // Explicitly link to the account_id column
  as: "account",           // Singular: card.account
});



module.exports = Cards;