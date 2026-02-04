
const Category = require('../model/category.model');



const getallcategory= async (req, res)=>{
    const allcategory = await Category.findAll({
    //     order: [
    // // Will escape title and validate DESC against a list of valid direction parameters
    // ['Id', 'DESC']]
    });
    // console.log("all category are :", allcategory);
    res.send(allcategory);
}       
const bulkcreatecatgory= async (req,res)=>{

    // here we add destructuring from body and check all fileds should be there
    const categorydata = req.body;
    // const {fullname,email,phonenumber,location,role} = req.body;
     if(!categorydata && !Array.isArray(categorydata)){
        console.log("missing category data");
        return res.status(400).send({response:"missing category data"});
    }

    const newcategory = await Category.bulkCreate(categorydata);
    // console.log("the new category created is :",newcategory);

    res.status(201).send({response:"category created successfully",});

}

module.exports = {
    getallcategory,
    bulkcreatecatgory
}