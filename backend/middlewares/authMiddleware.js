// FIXME: Update the auth middleware to check the expiry date of the token. 
const jwt = require('jsonwebtoken')
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });


const authTokenMiddleware = async(req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).send({response: "Authorization header not present"})
    }
    
    const token = req.headers.authorization.split(" ")[1] ;
    if(!token){
        return res.status(400).json({response: "No Token Provided"});
    }
    try {
        
        let decoded = jwt.verify(token, process.env.JWT_KEY, { algorithms: ['HS256'] });
        req.user = {email: decoded.email, iat: decoded.iat}

        next();        
    }
    catch (error){
        return res.status(400).json({response: "Invalid Token"})
    }
}

module.exports = authTokenMiddleware
