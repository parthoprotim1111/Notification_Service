const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const {ServerConfig}= require('../../config');
const serverConfig = require('../../config/server-config');

function checkPass(plainPassword,encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword,encryptedPassword)
    } catch (error) {
        console.log(error);
        throw error;
        
    }

    
}

function createToken(input) {
    try {
        return jwt.sign(input,ServerConfig.JWT_SECRET,{expiresIn:ServerConfig.JWT_EXPIRY})
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
    
}

function verifyToken(token){
    try {
        return jwt.verify(token,serverConfig.JWT_SECRET);
    } catch (error) {
        console.log(error);
        throw error;
        
    }

}

module.exports={
    checkPass,
    createToken,
    verifyToken
}