// import { commonRegex } from "./commonRegex.js";
// import { errorsMessages } from "./ErrorMessages.js";
// import { ObjectId } from "mongodb";
// import InvalidInputException from "../exceptions/InvalidInputException.js";
// import NotFoundException from "../exceptions/NotFoundException.js";
// import { validationResult } from "express-validator";
const { commonRegex } = require("./commonRegex");
const errorsMessages = require("./ErrorMessages");
const InvalidInputException = require("../exceptions/InvalidInputException");
const ObjectId = require("mongodb").ObjectId;
const { validationResult } = require("express-validator");

class Validator {
  static async chechSChema (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new InvalidInputException(errors.errors[0].msg);
    }
  }

  static validateEmail (email) {
    if (!commonRegex.email.test(email)) {
      throw new InvalidInputException(
        errorsMessages.invalidEmailFormat,
        404
      );
    }
  }

  static async validateExistInCollection (collection, id, message) {
    const existsInCollection = await collection.findOne({
      _id: new ObjectId(id)
    });

    if (!existsInCollection) throw new InvalidInputException(message);
  }

  static async validateIsUniqueInCollection (
    collection,
    filter,
    message,
    id = null
  ) {
    let entryExists;
    if (!id) {
      entryExists = await collection.findOne(filter);
    } else {
      entryExists = await collection.findOne({
        ...filter,
        _id: { $ne: new ObjectId(id) }
      });
    }
    if (entryExists) throw new InvalidInputException(message);
  }

  static validateIsValidObjectId (id) {
    if (!ObjectId.isValid(id)) throw new InvalidInputException(errorsMessages.invalidIdFormat);
    // return id;
  }

  static validateIsInteger (variable, message) {
    if (!Number.isInteger(variable) || !variable) {
      throw new InvalidInputException(message);
    }
  }

  static validateIsBoolean (variable, message) {
    if (typeof variable !== "boolean") {
      throw new InvalidInputException(message);
    }
  }

  static validatePaginationData (reqQuery) {
    if (!reqQuery.perPage) { throw new InvalidInputException(errorsMessages.missingPerPage); }
    if (!reqQuery.page) { throw new InvalidInputException(errorsMessages.missingPage); }

    if (!Number.isInteger(Number(reqQuery.page))) { throw new InvalidInputException(errorsMessages.noIntegerPage); }
    if (!Number.isInteger(Number(reqQuery.perPage))) { throw new InvalidInputException(errorsMessages.noIntegerPerPage); }
    return {
      perPage: parseInt(reqQuery.perPage),
      page: parseInt(reqQuery.page)
    };
  }
}

module.exports = Validator;
