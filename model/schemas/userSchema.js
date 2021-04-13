const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_FACTOR = 10;
const { Schema, model } = mongoose;

const { Subscription } = require("../../helpers/constants");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    minlength: 3,
    maxlength: 50,
    validate(value) {
      const re = /\S+@\S+\.\S+/;
      return re.test(String(value).toLowerCase());
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  subscription: {
    type: String,
    enum: {
      values: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      message: "Invalid type of subscription",
    },
    default: "free",
  },
  token: String,
  avatarURL: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
