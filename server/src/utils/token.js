const jwt = require('jsonwebtoken');
const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

    return token;
}

module.exports = { createToken }