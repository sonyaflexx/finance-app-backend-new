const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password_hash });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ user, access_token: token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ user, access_token: token });
});

module.exports = router;
