const express = require('express');
const { Transaction } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  const transactions = await Transaction.findAll();
  res.json(transactions);
});

router.post('/', async (req, res) => {
  const transaction = await Transaction.create(req.body);
  res.json(transaction);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedTransaction = await Transaction.update(req.body, {
    where: { id }
  });
  res.json(updatedTransaction);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Transaction.destroy({ where: { id } });
  res.json({ id });
});

module.exports = router;
