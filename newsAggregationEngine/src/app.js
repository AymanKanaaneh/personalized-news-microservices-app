const express = require('express');
const app = express();

const newsRoutes = require('./routes/newsroutes');

app.use(express.json());

app.use('/news', newsRoutes);

module.exports = app;