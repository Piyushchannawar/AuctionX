const nodemailer = require('nodemailer');
require("dotenv").config({
    path: `../../../.env.${process.env.NODE_ENV || "development"}`,
  });

console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD); // debug log

const sendMail = async (userEmail, mailSubject,content) => {
    // 1. create an email transpoter
    // smtp (simple mail transfer protocol) 

    const transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "channawarpiyush@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    // 2. config email content
    const mailOption = {
        from: "channawarpiyush@gmail.com",
        to: userEmail,
        subject: mailSubject,
        // html: content
        text: content,
      };


    // 3. send email
    try {
        const info =  await transpoter.sendMail(mailOption)
    console.log(info); 
    } catch (error) {
        console.log("error while sending email",error.message);
       // throw new Error("error while sending email",error.message);
    }
    
};



module.exports = sendMail;