const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Users = require("../services/userService");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id);
      if (!user) {
        return done(new Error("User not found"));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
