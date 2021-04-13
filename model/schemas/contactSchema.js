const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema, model, SchemaTypes } = mongoose;

const { Subscription } = require("../../helpers/constants");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    phone: {
      type: String,
      minlength: 8,
      maxlength: 20,
    },
    subscription: {
      type: String,
      required: [true, "Subscription is required"],
      minlength: 3,
      maxlength: 15,
      enum: {
        values: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
        message: "Invalid type of subscription",
      },
      default: "free",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      maxlength: 20,
    },
    token: {
      type: String,
      default: "",
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.plugin(mongoosePaginate);

// eslint-disable-next-line new-cap
const Contact = new model("contact", contactSchema);

module.exports = Contact;
