const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const incomeRouter = express.Router()

incomeRouter.post('/addCategory', authMiddleware  , async(req, res)=>{
        res.status(200).send({response: "Check"})
        
})




module.exports = incomeRouter