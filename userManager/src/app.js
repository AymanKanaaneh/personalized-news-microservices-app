const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');

app.use(express.json());

app.use('/user', userRoutes);

module.exports = app;