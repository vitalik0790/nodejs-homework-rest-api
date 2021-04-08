const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const { SUBSCRIPTION_TYPE, SALT_WORK_FACTOR } = require("../helpers/constants");

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    default: "Guest",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (v) => /\S+@\S+\.\S+/.test(v),
      message: (props) => `${props.value} invalid email`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  subscription: {
    type: String,
    enum: {
      values: Object.values(SUBSCRIPTION_TYPE),
      message: "This subscription isn't allowed",
    },
    default: SUBSCRIPTION_TYPE.free,
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
