const sendSuccessResponse = (res, message, data = {}, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  
  const sendErrorResponse = (res, message, error = {}, statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  };
  
  module.exports = {sendSuccessResponse, sendErrorResponse}