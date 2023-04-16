const express = require('express')
const mongoose = require('mongoose')
const authMiddleware = require('../middlewares/authMiddleware')
const User = require('../Models/user')
const Category = require('../Models/categorySchema')
const Income = require('../Models/income')
const incomeRouter = express.Router()


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

        }
        catch (err) {
          console.log(err)
          return res.status(500).json({ response: "Something is broke" })
        }

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


// TODO: Write API to get data  

incomeRouter.get('/getData', authMiddleware, async (req, res) => {
  try {

    let user = await User.findOne({ email: req.user.email });
    let userId = user._id 

    let incomeData = await Income.findOne({
      user: userId  
    }); 

    let incomeCategories = incomeData.categories
    console.log(incomeCategories)
    // TODO: Map through all the categories in incomeCategories and get the corresponding transactions in a structured json format to send as a resposne to the client.

    return res.status(200).json({response: "Data"})
  } catch (error) {
  console.log(error)
  return  res.status(500).json({ resposne: "Something is broken" })
}

})
// TODO: Copy APIs to other similar URLs 




module.exports = incomeRouter