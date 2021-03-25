const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
    },
    phone: {
      type: String,
      require: true,
      unique: true,
      minlength: 8,
      maxlength: 20,
    },
    subscription: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 15,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
