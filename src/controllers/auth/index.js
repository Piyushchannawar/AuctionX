const authService = require('../../services/auth/authService');
const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require('../../utils/propertyResolver');
const { sendSuccessResponse, sendErrorResponse } = require('../../utils/response');


const registerUser = async (req, res) => {

    try {
        const userInfo = await authService.saveUser(req.body); // save user info to db
        //res.send(userInfo);
        sendSuccessResponse(res, SUCCESS_MESSAGE.USER_CREATED, userInfo, 200);
    } catch (error) {
        sendErrorResponse(res, error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, "", 500); // handle error   
    }

};



module.exports = { registerUser };