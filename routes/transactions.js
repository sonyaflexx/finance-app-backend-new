const express = require('express');
const { Transaction } = require('../db/models');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { user_id: req.user.userId } });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const transaction = await Transaction.create({ ...req.body, user_id: req.user.userId });
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.update(req.body, {
      where: { id }
    });
    res.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ where: { id } });
    res.json({ id });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
