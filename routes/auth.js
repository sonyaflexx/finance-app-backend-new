const express = require('express');
const bcrypt = require('bcryptjs');
const { User, Category } = require('../db/models');
const router = express.Router();
const {generateJWTTokens} = require("../utils")
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already taken' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password_hash });
    const initialCategories = [
      { title: 'Общее', user_id: user.id },
      { title: 'Работа', user_id: user.id },
      { title: 'Еда', user_id: user.id },
      { title: 'Дом', user_id: user.id },
      { title: 'Транспорт', user_id: user.id },
    ];
    await Category.bulkCreate(initialCategories);

    const { access_token, refresh_token } = generateJWTTokens({ userId: user.id });
    res.cookie("refresh_token", refresh_token, { httpOnly: true, secure: true });
    res.json({ access_token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const { access_token, refresh_token } = generateJWTTokens({ userId: user.id })
  res.cookie("refresh_token", refresh_token, { httpOnly: true, secure: true })
  res.json({ user, access_token });
});

router.post('/refresh', async (req, res) => {
  const token = req.cookies?.refresh_token
  if (!token) return res.status(401).json({ message: "Refresh token not provided" })
  
  const payload = jwt.verify(token, process.env.JWT_SECRET)
  if (!payload) return res.status(401).json({ message: "Invalid token provided" })
  
  const { access_token, refresh_token } = generateJWTTokens({ userId: payload.userId })
  res.cookie("refresh_token", refresh_token)

  return res.json({ access_token })
})

router.get('/current', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Access token not provided" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ access_token: token });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
