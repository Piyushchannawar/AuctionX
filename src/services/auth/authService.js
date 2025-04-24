// db work

const Users = require("../../models/user");
const sendMail = require("../mail/mailService");



const saveUser = async (userDetails) => {
    try {
        const { email, role_id, verify_account_token, first_name } = userDetails; // destructure email from userDetails
        if (role_id === 1) {
            throw new Error('Role id 1 is not allowed');
        }
        const isEmailPresent = await Users.findOne({ where: { email } });
        if (isEmailPresent) {
            throw new Error('Email already exists'); // check if email already exists
        }


        const result = await Users.create(userDetails); // insert query
        const verifyAccountUrl = `/account-verify?token=${verify_account_token}` // front url
        const contentHtml = `
         <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Verification</title>
  <style>
    /* General Reset */
    body, h1, p, a {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      background-color: #f4f4f4;
      color: #333;
      font-size: 16px;
      line-height: 1.5;
      padding: 20px;
    }

    .email-container {
      background-color: #ffffff;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .email-header {
      background-color: #4CAF50;
      color: white;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .email-header h1 {
      font-size: 24px;
      margin: 0;
    }

    .email-body {
      padding: 20px;
      text-align: center;
    }

    .email-body p {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .verification-button {
      background-color: #4CAF50;
      color: white;
      padding: 12px 25px;
      text-decoration: none;
      font-size: 18px;
      border-radius: 5px;
      display: inline-block;
    }

    .verification-button:hover {
      background-color: #45a049;
    }

    .email-footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #888;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    .email-footer a {
      color: #4CAF50;
      text-decoration: none;
    }

    @media screen and (max-width: 600px) {
      .email-container {
        width: 100%;
        padding: 10px;
      }

      .email-body p {
        font-size: 14px;
      }

      .verification-button {
        font-size: 16px;
        padding: 10px 20px;
      }
    }
  </style>
</head>
<body>

  <div class="email-container">
    <div class="email-header">
      <h1>Account Verification</h1>
    </div>

    <div class="email-body">
      <p>Hello ${first_name},</p>
      <p>Thank you for registering with us! To complete your account setup, please click the button below to verify your email address:</p>
      <a href=${verifyAccountUrl} class="verification-button">Verify My Email</a>
    </div>

    <div class="email-footer">
      <p>If you did not create an account, no further action is required.</p>
      <p>For any questions, feel free to <a href="mailto:channawarpiyush@gmail.com">contact us</a>.</p>
    </div>
  </div>
</body>
</html>
        `
        await sendMail(email, "Welcome to Auctionx",contentHtml)


        return result; // return the result of the insert query
    } catch (error) {
        throw new Error('Error while saving user: ' + error.message); // handle error    
    }
};


module.exports = {
    saveUser
};