const articleTypeSchema = {
  name: {
    isString: true,
    notEmpty: true,
    errorMessage: "Name field cannot be empty and must be string"
  },
  type: {
    isString: true,
    notEmpty: true,
    errorMessage: "Type field cannot be empty and must be string"
  },
  slug: {
    isString: true,
    notEmpty: true,
    errorMessage: "Slug field cannot be empty and must be string"
  },
  icon: {
    notEmpty: true,
    isString: true,
    errorMessage: "Icon field cannot be empty and must be string"
  },
  isEnabled: {
    isBoolean: true,
    errorMessage: "isEnabled field must be given as boolean"
  }
};

module.exports = articleTypeSchema;
