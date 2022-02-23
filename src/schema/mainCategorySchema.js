const mainCategorySchema = {
  name: {
    isString: true,
    notEmpty: true,
    errorMessage: "Name field cannot be empty and must be string"
  },
  icon: {
    notEmpty: true,
    isString: true,
    errorMessage: "Icon field cannot be empty and must be string"
  },
  isEnabled: {
    isBoolean: true,
    errorMessage: "isEnabled field must be given as boolean"
  },
  isMainCategory: {
    isBoolean: true,
    errorMessage: "isMainCategory field must be given as boolean"
  },
  description: {
    isString: true,
    notEmpty: false
    // errorMessage: "Please provide descroptio"
  }
};

module.exports = mainCategorySchema;
