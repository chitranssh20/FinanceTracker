const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    amount: { type: Number, required: true },
    date: { type: Date, required: true }
});

const categorySchema = new Schema({
    categoryName: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    transactions: [transactionSchema],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = {
    Category
};
