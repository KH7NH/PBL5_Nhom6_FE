const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const {pool} = require('../config/db.config');

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const [user] = await pool.query('SELECT * FROM users WHERE username = ?', [payload.username]);

    if (user.lenth > 0 && !user[0]) {
      return done(null, false);
    }

    done(null, user[0]);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};