const errorsMessages = {
  missingLang: "Please provide 'lang' parameter with Accept-Language header. Can be 'pl' or 'en'",
  invalidLang: "Invalid language in Accept-Language header. Can be 'pl' or 'en'",
  idNotExists: "Such id not exists id database",
  createUserError: "User can be created only by sigUp API",
  emailExists: "Such email address already exists",
  incorrectEmail: "Incorrect email",
  emailIsRequired: "email is required",
  emailTooLong: "email too long. email must be max 255 characters",
  invalidEmailFormat: "Invalid email format",
  incorrectPassword: "Incorrect password",
  invalidIdFormat: "Invalid Id format",
  invalidId: "Invalid Id",
  userNotFound: "User not found",
  missingToken: "Missing jwt token",
  missingAuthorization: "Operation requires authorization. Please provide Authorization header with valid jwtToken",
  invalidToken: "Invalid jwt token",
  missingPerPage: "Please add perPage number to query",
  missingPage: "Please add Page number to query",
  noIntegerPage: "Page must be integer",
  noIntegerPerPage: "perPage must be integer",
  itemsNotFound: "No items to display",
  itemNotFound: "No item to display",
  notAuthorized: "You are not authorized to do this operation",
  notSuperAdmin: "SUPERADMIN privilege required",
  passwordNotAllowed: "Password can be change only by other API endpoint",
  notConnectionToDb: "Unable to establish connection to MongoDB",
  passwordIsRequired: "password is required",
  passwordNotMatch:
    "Password must be 8-30 characters and contain 1 capital letter, 1 digit and 1 special character `!@#$%^&*()-_+'",
  // ----------------
  articleTypeNameRequired: "articleType name is required",
  articleTypeTypeRequired: "articleType type is required",
  articleTypeIconRequired: "articleType icon is required",
  articleTypeNameTooShort:
    "articleType name too short. articleType name must be 2-20 characters",
  articleTypeNameTooLong:
    "articleType name too long. articleType name must be 2-20 characters",
  articleTypeValidTypes: "Type can be 'category' of 'serie'",
  seriePartRequired: "seriePart is required",
  seriePartMustBeInt: "serie part must integer",
  articleTypeNotFound: "article type not found",
  suchNameInTypeExists: "such name in given serie/category already exists",
  // -----
  creatorIsRequired: "creator Id is required",
  articleTypeIdIsRequired: "articleType Id is required",
  // -------
  polishTitleIsRequired: "Polish title is required",
  articleTitleTooShort: "Title is too short - min 5 characters",
  articleTitleTooLong: "Title is too long - max 255 characters",
  articleTypeIsRequired: "article type is required ",
  articleTitleExists: "such article title already exists",
  // --------
  abrOrPhraseIsRequired: "abbreviation or phrase  field is required",
  abbTooShort: "abbreviation is too short - min 2 characters",
  abbTooLong: "abbreviation is too short - max 10 characters",
  phraseTooShort: "Phrase is too short - min 2 characters",
  phraseTooLong: "Phrase is too long - max 100 characters",
  explicationIsRequired: "Explication for given abbreviation is required",
  explicationTooShort: "Explication is too short - min 2 characters",
  explicationTooLong: "Explication is too long - max 100 characters",
  // ------
  firstNameIsRequired: "firstName is required",
  firstNameTooShort: "firstName too short. firstName must be 2-50 characters",
  firstNameTooLong: "firstName too long. firstName must be 2-50 characters",
  firstNameNotMatch:
    "Invalid firstName format. Valid format eq. 'Ludwik or Jean-Phillipe'",
  lastNameIsRequired: "lastName is required",
  lastNameTooShort: "lastName too short. lastName must be 2-50 characters",
  lastNameTooLong: "lastName too long. lastName must be 2-50 characters",
  lastNameNotMatch:
    "Invalid lastName format. Valid format eq. 'Kowalski or Kowalska-Diuk'"
};

module.exports = errorsMessages;
