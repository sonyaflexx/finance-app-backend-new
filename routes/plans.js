const express = require('express');
const { Plan } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  const plans = await Plan.findAll();
  res.json(plans);
});

router.post('/', async (req, res) => {
  const plan = await Plan.create(req.body);
  res.json(plan);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPlan = await Plan.update(req.body, {
    where: { id }
  });
  res.json(updatedPlan);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Plan.destroy({ where: { id } });
  res.json({ id });
});

module.exports = router;
