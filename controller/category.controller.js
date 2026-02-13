const Category = require("../model/category.model");
const { Op } = require("sequelize");

const getallcategory = async (req, res) => {
  const allcategory = await Category.findAll({
    //     order: [
    // // Will escape title and validate DESC against a list of valid direction parameters
    // ['Id', 'DESC']]
  });
  // console.log("all category are :", allcategory);
  res.send(allcategory);
};

const getcategorybyid = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) {
    return res.status(404).send({ response: "category not found" });
  }
  console.log("full category name and id is:", category.fullcategoryNameandId);
  res.send(category);
};

const addcategory = async (req, res) => {
  const { categoryName, categoryId } = req.body;
  if (!categoryName || !categoryId) {
    // console.log("missing category name or category id");
    return res
      .status(400)
      .send({ response: "missing category name or category id" });
  }
  try {
    const newcategory = await Category.create({ categoryName, categoryId });
    // console.log("the new category created is :",newcategory);
    res
      .status(201)
      .send({ response: "category created successfully", data: newcategory });
  } catch (error) {
    console.log("the error is :", error);
  }
};

const deletecategory = async (req, res) => {
  const userid = req.params.id;

  await Category.destroy({
    where: {
      id: userid,
    },
  });
  res.send({ response: `category deleted successfully ${userid}` });

  // const bulkcreatecatgory = async (req, res) => {
  //     const categorydata = req.body;
  //     if (!Array.isArray(categorydata) || categorydata.length === 0) {
  //         return res.status(400).send({ response: "Invalid input. Please provide an array of category data." });
  //     }
  //     try {
  //         const newcategories = await Category.bulkCreate(categorydata);
  //         res.status(201).send({ response: "Categories created successfully", data: newcategories });
  //     } catch (error) {
  //         console.log("Error creating categories:", error);
  //         res.status(500).send({ response: "An error occurred while creating categories." });
  //     }
  // }
};

module.exports = {
  getallcategory,
  getcategorybyid,
  addcategory,
  deletecategory,
  // bulkcreatecatgory
};
