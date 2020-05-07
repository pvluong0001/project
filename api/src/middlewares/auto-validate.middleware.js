import { validationResult } from "express-validator";

export default function (req, res, next) {
  const validateRes = validationResult(req);

  if (!validateRes.isEmpty()) {
    return res.status(422).json({
      errors: validateRes.array()
    })
  }

  next();
}