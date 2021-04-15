const mongoose = require("mongoose");
const { HTTP_CODE } = require("../../../helpers/constants");

const ObjectId = mongoose.Types.ObjectId;

function isIdValid(req, res, next) {
  const {
    params: { contactId },
  } = req;

  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({
      status: "error",
      code: HTTP_CODE.BAD_REQUEST,
      message: "Id is invalid",
    });
  }
  next();
}

module.exports = isIdValid;
