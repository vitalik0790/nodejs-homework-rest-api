const passport = require("passport");
require("../config/passport");
const { HTTP_CODE } = require("./constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (err || !user || token !== user.token) {
      return res.status(401).json({
        status: "error",
        code: HTTP_CODE.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
