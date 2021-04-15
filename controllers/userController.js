const jwt = require("jsonwebtoken");
const Users = require("../services/userService");
const { HTTP_CODE } = require("../helpers/constants");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
      return next({
        status: HTTP_CODE.CONFLICT,
        message: "This email is already use",
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(HTTP_CODE.CREATED).json({
      status: "success",
      code: HTTP_CODE.CREATED,
      data: {
        email: newUser.email,
        name: newUser.name,
        subscription: newUser.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    if (!user || !user.validPassword(password)) {
      return res.status(HTTP_CODE.UNAUTHORIZED).json({
        status: "error",
        code: HTTP_CODE.UNAUTHORIZED,
        data: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.status(HTTP_CODE.OK).json({
      status: "success",
      code: HTTP_CODE.OK,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    await Users.updateToken(id, null);
    return res.status(HTTP_CODE.NO_CONTENT).json({});
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  const { subscription } = req.body;
  const { id } = req.user;
  try {
    await Users.updateSubscriptionUser(id, subscription);
    const user = await Users.findById(id);
    return res.status(HTTP_CODE.OK).json({
      status: "success",
      code: HTTP_CODE.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await Users.findById(id);
    return res.status(HTTP_CODE.OK).json({
      status: "success",
      code: HTTP_CODE.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { register, login, logout, updateUser, current };
