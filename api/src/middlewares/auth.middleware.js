import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({
      errors: 'Missing token!'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = {
      ...decoded
    }

    next()
  } catch(e) {
    return res.status(401).json({
      errors: 'Unauthorized'
    });
  }
}