const express = require('express')
const mongoose = require('mongoose')
const authMiddleware = require('../middlewares/authMiddleware')
const User = require('../Models/user')
const Category = require('../Models/categorySchema')
const transactionRouter = express.Router()



transactionRouter.post('/add', authMiddleware, async (req, res) => {
    if (!req.body.category || !req.body.transaction) {
        return res.status(400).json({ response: "Missing Fields" });
    }
    else {

        if (!req.body.transaction.amount) {
            return res.status(400).json({ response: "Missing Fields" });
        }

        try {

            let user = await User.findOne({ email: req.user.email });
            let userId = user._id

            doesCategoryExist = await Category.findOne({ user: userId, categoryName: req.body.category });


            // If category does not exist 
            if (!doesCategoryExist) {
                return res.status(400).json({ response: "Category does not exist for this user" })
            }

            // If category exists

            else {
                categoryId = doesCategoryExist._id

                let categoryTransactions = doesCategoryExist.transactions

                try {


                    categoryTransactions.push({ amount: req.body.transaction.amount, date: Date.now() })

                    let updatedCategory = await Category.updateOne({ user: userId, categoryName: req.body.category }, { $set: { transactions: categoryTransactions } })

                    if (updatedCategory.modifiedCount == 1) {
                        return res.status(202).json({ response: "Transaction has been added" })
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }



        } catch (error) {
            console.log(error)
        }

        return res.status(500).send("Something is broken")
    }

})


// I know I should use delete method to delete and I know how to do that but hehe ... 
transactionRouter.post('/deleteCategory', authMiddleware, async (req, res) => {
    if (!req.body.category) {
        return res.status(400).json({ response: "Missing Fields" })
    }
    else {
        try {
            let user = await User.findOne({ email: req.user.email });
            let userId = user._id

            let categoryExists = await Category.findOne({ user: userId, categoryName: req.body.category });

            if (!categoryExists) {
                return res.status(404).json({ resposne: "Category deos not exist" })
            }

            else {
                let deletedCategory = await Category.deleteOne({
                    categoryName: req.body.category,
                    user: userId
                })

                if (deletedCategory.deletedCount == 1) {

                    return res.status(201).json({ response: "Category has been deleted" })
                }
                else {
                    return res.send(500).json({ response: "Something is broken" })
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    return res.send(500).json({ response: "Something is broken" })
})


module.exports = transactionRouter