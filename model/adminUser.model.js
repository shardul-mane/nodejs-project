const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/index");
const { FORCE } = require("sequelize/lib/index-hints");

class AdminUser extends Model {}

AdminUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // MUST BE UNCOMMENTED
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      //  unique:true
    },
    password: {
      type: DataTypes.STRING(255),
    },
    role: {
      type: DataTypes.ENUM("Admin", "User"),
      defaultValue: "User",
    },
    token: {
      type: DataTypes.TEXT,
      defaultValue: "str",
    },
    token_expried: {
      type: DataTypes.INTEGER(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "AdminUser",
    tableName: "adminuser_table",
    paranoid: true,
    deletedAt: "destroy_time",
  },
);

AdminUser.sync({ alter: true })
  .then(() => {
    console.log("adminUser table created ");
  })
  .catch((error) => {
    console.log("the error is :", error);
  });

// AdminUser.init({
module.exports = AdminUser;
