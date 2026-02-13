const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Model attributes are defined here
    categoryName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue("categoryName", value.toLowerCase());
      },
    },

    categoryId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        len: {
          args: [2, 4],
          msg: "Category ID must be between 2 and 4 characters.", // Custom message for length
        },
      },
    },
    user_Id: {
      type: DataTypes.INTEGER,
    },
    fullcategoryNameandId: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.categoryName} - ${this.categoryId}`;
      },
    },
  },
  {
    paranoid: true,

    // If you want to give a custom name to the deletedAt column
    deletedAt: "destroyTime",
    // Other model options go here
    // scopes: {
    // Define a scope to filter categories by name
    // byCategoryName(name) {
    sequelize, // We need to pass the connection instance
    modelName: "Category", // We need to choose the model name
    tableName: "categories", // specify the table name
  },
);

Category.sync()
  .then(() => {
    console.log("Category table created successfully");
  })
  .catch((err) => {
    console.log("The error is :", err);
  });
module.exports = Category;
// the defined model is the class itself
console.log(Category === sequelize.models.Category); // true
