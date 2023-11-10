const {DB404Error, BadReqError, UnauthorizedError} = require("./customErrors");

const handleError = (err, res) => {
  let statusCode, message, errorFields;
  switch (err.code){
    case undefined:
      if (err.name === "ValidationError"){
        statusCode = 400;
        errorFields = Object.values(err.errors).map(error=> ({field: error.path, kind: error.kind, message: error.message}));

        message = Object.keys(err.errors).reduce((msg, key)=> {
          msg += err.errors[key].message + " ";
          return msg;
        }, "").trim();
      } else { // programmatic error
        statusCode = 500; 
        message = "internal server Error: " + err.message;
      }
      break;
    case 11000: // request tried to dublicate a saved unique key
      repeatedField = Object.keys(err.keyValue)[0];
      errorFields = [{field: repeatedField, kind: "dublicate", message: `this ${repeatedField} is already used before!`}]
      statusCode = 422;
      message = `this ${repeatedField} is already used before!`;
      break;
    case 401:
      statusCode = 401;
      message = err.message;
      break;
    case 404:
      statusCode = 404;
      message = err.message;
      break;
    default:
      statusCode = 400;
      message = err.message
  }
  console.log(err);
  res.status(statusCode).json({ message, errorFields });
}

const catchErrors = (controller) => (req, res, next) => {
  return Promise.resolve(controller(req, res, next)).catch((err)=> handleError(err, res));
}

module.exports = {
  catchErrors,
  DB404Error,
  BadReqError,
  UnauthorizedError
};