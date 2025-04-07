// db work

const Users = require("../../models/user");



const saveUser = async (userDetails)=>{
    try {
    const {email,role_id} = userDetails; // destructure email from userDetails
    if(role_id === 1){
        throw new Error('Role id 1 is not allowed');
    }
    const isEmailPresent = await Users.findOne({where: { email }});   
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