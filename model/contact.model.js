


// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('../database/index');


// class Contact extends Model { }


// Contact.init(
//     {
//         id:{
//             type:DataTypes.INTEGER,
//             autoIncrement:true, 
//             primaryKey:true,
//         },
//         currentaddress:{
//             type :DataTypes.STRING(200),
//             allowNull:false,
//         },
//         permanentaddress:{
//             type :DataTypes.STRING(200),
//             allowNull:false,
//         },
//         user_Id :{
//             type:DataTypes.INTEGER

//         }
//     },
//     {
//             paranoid:true,
//             deletedAt:'destroyTime',
//             sequelize,
//             modelName:'Contact',
//             tableName:'contacts_table',
//     }
// );

// Contact.sync().then(()=>{
//     console.log("Contact table created successfully");
// }).catch((err)=>{
//     console.log("the error is :",err);
// })

// module.exports = Contact;   


const { DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require('../database/index.js');


const Contact = sequelize.define(
  'Contact',
  {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true, 
            primaryKey:true,
        },
        currentaddress:{
            type :DataTypes.STRING(200),
            allowNull:false,
        },
        permanentaddress:{
            type :DataTypes.STRING(200),
            allowNull:false,
        },
        user_Id :{
            type:DataTypes.INTEGER

        },
  },
  {
    paranoid: true,

    // If you want to give a custom name to the deletedAt column
    deletedAt: 'destroyTime',
    // // Other model options go here
    tableName: 'contacts_table',
  },
);
// Contact.associate = (models) => {
//   Contact.belongsTo(models.User, {
//     foreignKey: 'user_Id',
//     as: 'userInfo',
//   });
// }
Contact.sync().then(() => {
  console.log("contacts_table table created successfully")
}).catch((err) => {
  console.log("the error is :", err)
});





module.exports = Contact;
// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true