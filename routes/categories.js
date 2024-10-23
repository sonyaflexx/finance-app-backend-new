const express = require('express');
const { Category } = require('../db/models');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware, async (req, res) => {
  const categories = await Category.findAll({ where: { user_id: req.user.userId } });
  res.json(categories);
});

router.post('/', authMiddleware, async (req, res) => {
  const category = await Category.create({ ...req.body, user_id: req.user.userId });
  res.json(category);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updatedCategory = await Category.update(req.body, {
    where: { id }
  });
  res.json(updatedCategory);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  await Category.destroy({ where: { id } });
  res.json({ id });
});

module.exports = router;