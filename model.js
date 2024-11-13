const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    appName: String,
    category: String,  // e.g., "Food Delivery", "Shopping", etc.
    amount: Number,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
