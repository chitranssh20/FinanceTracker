const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const User = require('../Models/user')
const Category = require('../Models/categorySchema')
const Income = require('../Models/income')
const incomeRouter = express.Router()

incomeRouter.post('/addCategory', authMiddleware, async(req, res) => {
        console.log(req.body.category)
        if (!req.body.category || req.body.category === undefined) {
          return res.status(204).json({response: "Missing Data" });
        }
      
        let userIncome = await Income.findOne({ email: req.user.email, category: req.body.category });
      
        if (userIncome === null) {
          // TODO: Handle case where category is null for that user
        } else {
          // TODO: Handle case where category is not null for that user
        }
      
        res.status(200).send({ response: "Check" });
      });
      




module.exports = incomeRouter