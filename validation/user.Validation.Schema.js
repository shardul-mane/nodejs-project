const yup = require("yup");

const userSchemaValidation = yup
  .object({
    fullname: yup
      .string()
      .required("fullName is required")
      .min(4, "fullname must be at least 4 characters")
      .max(25, "fullname must be at most 25 characters"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "password must be at least 8 characters")
      .max(50, "password must be at most 50 characters"),

    role: yup
      .string()
      .oneOf(["Admin", "User"], "Invalid role")
      ,

    balance: yup.number().integer("Balance must be an integer"),

    location: yup.string().required("location is required"),
  })
  .noUnknown(true, "Unexpected fields found in request")
  .strict();

module.exports = userSchemaValidation;
