const authService = require('../../services/auth/authService');
const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require('../../utils/propertyResolver');
const { sendSuccessResponse, sendErrorResponse } = require('../../utils/response');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const registerUser = async (req, res) => {

    try {
        const { password } = req.body;
        // Hash the password using bcrypt
        const hashPassword = await bcrypt.hash(password, 10)

        // Generate token
        const accountToken = uuidv4();
        const accountTokenExpiry = Date.now() + 36000000; // 1 hour in milliseconds





        const userInfo = await authService.saveUser({ ...req.body, password: hashPassword,
        verify_account_token: accountToken,
        verify_account_expires: accountTokenExpiry,    

         }); // save user info to db
        //res.send(userInfo);
        sendSuccessResponse(res, SUCCESS_MESSAGE.USER_CREATED, userInfo, 200);
    } catch (error) {
        sendErrorResponse(res, error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, "", 500); // handle error   
    }

};



module.exports = { registerUser };