// middleware/validate.js
const validate = (schema) => async (req, res, next) => {
  try {
    const validatedBody = await schema.validate(req.body, {
      abortEarly: false, // Tells you EVERY error, not just the first one
      stripUnknown: false, // Set to false so noUnknown(true) can actually catch extras
    });

    req.body = validatedBody;
    next();
  } catch (err) {
    // THIS LINE IS THE KEY: It sends back the actual Yup error messages
    return res.status(400).json({
      success: false,
      msg: "Validation Failed",
      errors: err.errors // This will tell you exactly which field failed and why
    });
  }
};


module.exports = validate;