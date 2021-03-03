const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = jwtSecret.jwtSecret;

    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({message: 'Sorry, your token is invalid.'});
      } else {
        req.jwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({message: 'Please provide the authentication information'});
  }
};