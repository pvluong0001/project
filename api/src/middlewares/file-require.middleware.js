import { capitalizeFirstLetter } from "@helpers/base.helper";

function validateError(errorMessage) {
  return function(err, req, res, next) {
    if(err || !req.file)
      return res.status(422).json({
        errors: errorMessage
      })

    next();
  }
}

function missingFile(errorMessage) {
  return function(req, res, next) {
    if(!req.file)
      return res.status(401).json({
        errors: errorMessage
      })

    next();
  }
}

export default function(inputFileName, required = true) {
  const errorMessage = `${capitalizeFirstLetter(inputFileName)} is required!`;

  return required ? [validateError(errorMessage), missingFile(errorMessage)] : validateError(errorMessage);
}