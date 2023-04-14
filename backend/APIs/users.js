const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../Models/user');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const router = express.Router()


const genToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, { algorithm: 'HS256' });
    return token;
  };
  





router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        
        if(req.body.name === undefined || req.body.email == undefined || req.body.password === undefined){
            return res.status(400).send({response: "Some fields are missing"})
        }

        const response = await user.save()
        let registrationToken = genToken({email: req.body.email, password: req.body.password})
        res.status(200).json({response: "User has been registered", token: registrationToken})
    }  
    catch (error) {
        if(error.code === 11000){
            res.status(500).send({response: "Email Id already exists"})
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
                let loginToken = genToken({email: req.body.email, passsword: req.body.password})
                res.status(200).json({response: "Successfully Logged In",  passwordMatched: isMatch, token: loginToken})
                
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






