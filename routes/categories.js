const express = require('express');
const { Category } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

router.post('/', async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedCategory = await Category.update(req.body, {
    where: { id }
  });
  res.json(updatedCategory);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Category.destroy({ where: { id } });
  res.json({ id });
});

module.exports = router;
