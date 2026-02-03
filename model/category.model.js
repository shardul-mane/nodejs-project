

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/index');

class Category extends Model {}


Category.init(
  {
    // Model attributes are defined here
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    
    sequelize, // We need to pass the connection instance
    modelName: 'Category', // We need to choose the model name
    tableName: 'categories', // specify the table name
  },
);

Category.sync().then(() => {
  console.log('Category table created successfully');
}).catch((err) => {
  console.log('The error is :', err);
}); 
module.exports = Category;
// the defined model is the class itself
console.log(Category === sequelize.models.Category); // true

