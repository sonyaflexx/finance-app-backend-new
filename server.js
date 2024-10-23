require("dotenv").config()

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');
const planRoutes = require('./routes/plans');
const cors = require("cors")

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://finance-manager-eosin.vercel.app',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "PUT"]
}));

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/plans', planRoutes);

app.get('/', (req, res) => {
  res.status(200).json({message: "всё норм"})
})

const PORT = process.env.PORT || 8000;
console.log("start connecting to database...")
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(e => console.log(e));
