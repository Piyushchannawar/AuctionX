// db work

const Users = require("../../models/user");



const saveUser = async (userDetails)=>{
    try {
    const {email} = userDetails; // destructure email from userDetails
    const isEmailPresent = await Users.findOne({email});   
    if(isEmailPresent) {
        throw new Error('Email already exists'); // check if email already exists
    }
    

    const result = await  Users.create(userDetails); // insert query
    return result; // return the result of the insert query
    } catch (error) {
    throw new Error('Error while saving user: ' + error.message); // handle error    
    }
};


module.exports = {
    saveUser
};