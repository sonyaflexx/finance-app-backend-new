const express = require('express');
const { Plan } = require('../db/models');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware, async (req, res) => {
  const plans = await Plan.findAll({ where: { user_id: req.user.userId } });
  res.json(plans);
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const plan = await Plan.create({ ...req.body, user_id: req.user.userId });
    res.status(201).json(plan);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updatedPlan = await Plan.update(req.body, {
    where: { id }
  });
  res.json(updatedPlan);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  await Plan.destroy({ where: { id } });
  res.json({ id });
});

module.exports = router;
