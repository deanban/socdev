const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //   data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  //   data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //   if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
  //     errors.name = "Name must be between 2 and 30 chars";
  //   }

  //   if (Validator.isEmpty(data.name)) {
  //     errors.name = "Name is required";
  //   }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }
  //   if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
  //     errors.password = "password must be atleast 6 chars";
  //   }
  //   if (Validator.isEmpty(data.password2)) {
  //     errors.password2 = "confirm password is required";
  //   }
  //   if (!Validator.equals(data.password, data.password2)) {
  //     errors.password2 = "passwords must match";
  //   }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
