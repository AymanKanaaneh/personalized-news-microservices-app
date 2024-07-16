const express = require('express');
const app = express();

const newsRoutes = require('./routes/newsRoutes');

app.use(express.json());

// app.use('/news', newsRoutes);
app.use('/emailsqueue', newsRoutes);


module.exports = app;