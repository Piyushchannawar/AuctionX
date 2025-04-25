const { sendErrorResponse } = require("../utils/response");

const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details[0].message;
    return sendErrorResponse(res, message, "", 500);
  }
  next();
};

module.exports = validateSchema;