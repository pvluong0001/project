import { capitalizeFirstLetter } from "@helpers/base.helper";

export default function(inputFileName) {
  return function(err, req, res, next) {
    if(err)
      return res.status(422).json({
        errors: `${capitalizeFirstLetter(inputFileName)} is required!`
      })

    console.log(req.file);
    

    next();
  }
}