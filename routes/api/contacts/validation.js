const Joi = require("joi");
const { HTTP_CODE } = require("../../../helpers/constants");

const schemaCreateCotact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\(?\d{3}\)? ?-? ?\d{3} ?-? ?\d{4}$/)
    .required(),
  subscription: Joi.any().valid("free", "pro", "premium"),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^\(?\d{3}\)? ?-? ?\d{3} ?-? ?\d{4}$/)
    .optional(),
  subscription: Joi.string(),
}).min(1);

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HTTP_CODE.BAD_REQUEST,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.createContact = (req, res, next) => {
  return validate(schemaCreateCotact, req.body, next);
};

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
