const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../Models/user');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

console.log(__dirname)
const router = express.Router()
const genToken = (payload) => {

 

    const {email, password} = payload
    // console.log('port ' + process.env.PORT)
    // console.log('key'  + process.env.JWT_KEY)
        let token = jwt.sign(payload, process.env.JWT_KEY); 
        console.log(token)
        return token
}

 let ourToken = genToken({email: 'sample@sample.com', password: 'password'})


const decodeToken = (token) => {
    let decoded = jwt.verify(token, process.env.JWT_KEY)
    console.log('decoded Details', decoded)
}
decodeToken(ourToken);


router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        
        if(req.body.name === undefined || req.body.email == undefined || req.body.password === undefined){
            return res.status(400).send({"response": "Some fields are missing"})
        }


        const response = await user.save()
        res.send(req.body)
    }  
    catch (error) {
        if(error.code === 11000){
            res.status(500).send("Email Id already exists")
        }
    }
})

router.post('/login', async(req, res) => {
    if(req.body.email === undefined || req.body.password === undefined){
        return res.status(400).send({response: "Missing fields"})
    }

    try{
        const {email, password} = req.body; 
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({"response": "User not found"})
        }

            const isMatch = await user.comparedPassword(password);
            if(isMatch){
                res.status(200).json({response: "Successfully Logged In",  passwordMatched: isMatch})
                
            }
            else{
                res.status(200).json({response: "Wrong Password", passwordMatched: isMatch})
            }
    }
    catch(error){
        res.send(error)
    }
})

module.exports = router






