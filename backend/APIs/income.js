const express = require('express')
const mongoose = require('mongoose')
const authMiddleware = require('../middlewares/authMiddleware')
const User = require('../Models/user')
const Category = require('../Models/categorySchema')
const Income = require('../Models/income')
const incomeRouter = express.Router()

<<<<<<< HEAD
incomeRouter.post('/addCategory', authMiddleware, async(req, res) => {
        console.log(req.body.category)
        if (!req.body.category || req.body.category === undefined) {
          // return res.status(200).send({ response: "Check" });
          return res.status(204).send({ response: "Missing Data" });
          return res.status(204).json({response: "Missing Data" });
=======













incomeRouter.post('/addCategory', authMiddleware, async (req, res) => {

  if (!req.body.category || req.body.category === undefined) {
    return res.status(204).json({ response: "Missing Data" });
  }

  let user = await User.findOne({ email: req.user.email });
  let userId = user._id


  let categoryforUser = await Category.findOne({ user: userId, categoryName: req.body.category });



  if (categoryforUser === null) {
    try {

      category = new Category({ categoryName: req.body.category, user: userId, transactions: [] })
      let saveCategory = await category.save()
      categoryId = saveCategory._id

      let incomeCategoriesofUser = await Income.findOne({ user: userId })


      if (incomeCategoriesofUser === null) {
        try {
          const createIncomeCategory = new Income({
            categories: [categoryId],
            user: userId
          })
          const saveIncomeCategory = createIncomeCategory.save();

>>>>>>> current
        }
        catch (err) {
          console.log(err)
          return res.status(500).json({ response: "Something is broke" })
        }
<<<<<<< HEAD
      
      });
      
=======

      }
      else {
        currentCategoryArray = incomeCategoriesofUser.categories
        currentCategoryArray.push(categoryId);
        updatedArray = currentCategoryArray


        let updatedIncomeCategory = await Income.updateOne({ user: userId }, { $set: { categories: updatedArray } })

        if (updatedIncomeCategory.modifiedCount === 1) {
          return res.status(202).json({ response: "Category has been added" })
        }
        else {
          return res.status(500).json({ response: "Some Error occured" })
        }
      }

      return res.status(201).send({ response: "Category has been added" })
    }
    catch (err) {
      console.log(err);
    }


  } else {
    return res.status(202).json({ response: "Category already exists" })

  }

  res.status(500).send({ response: "Something is broke" });
});

>>>>>>> current




module.exports = incomeRouter