const Contact = require("../model/contact.model.js");

const addcontact = async (req, res) => {
  const contactdata = req.body;
  if (!contactdata) {
    console.log("missing contact data");
    return res.status(400).send({ response: "missing contact data" });
  }

  const newcontact = await Contact.create(contactdata);
  console.log("the new contact created is :", newcontact);
  res
    .status(201)
    .send({ response: "contact created successfully", data: newcontact });
};

module.exports = { addcontact };
