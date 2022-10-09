const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// this middleware protects any private routes:
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // check that the auth is in the header and that it's a bearer token:
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get the token from the bearer header,
      // as it is in the format 'Bearer {token}':
      token = req.headers.authorization.split(' ')[1];

      // verify the token:
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded) {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('not authorized, no token is present');
  }
});

module.exports = { protect };
