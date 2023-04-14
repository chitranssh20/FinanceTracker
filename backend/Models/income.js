const mongoose = require('mongoose');
const Category = require('./categorySchema');
const User = require('./user')

const incomeSchema = new mongoose.Schema({
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    unique: true,
  }
});



module.exports = mongoose.model('income', incomeSchema);
