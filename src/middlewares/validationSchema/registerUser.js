const Joi = require("joi");

const registerSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).optional().allow("", null),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role_id: Joi.string().required().valid("1", "2", "3"),
});
module.exports = registerSchema;