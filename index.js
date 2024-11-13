require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route to add a transaction
app.post('/api/transactions', async (req, res) => {
    try {
        const { appName, category, amount } = req.body;
        const transaction = new Transaction({ appName, category, amount });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add transaction' });
    }
});

// Route to get transactions by category
app.get('/api/transactions/:category', async (req, res) => {
    try {
        const transactions = await Transaction.find({ category: req.params.category });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
