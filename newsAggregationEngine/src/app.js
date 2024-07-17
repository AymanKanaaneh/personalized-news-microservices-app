const express = require('express');
const app = express();

const newsRoutes = require('./routes/newsRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/emailsqueue', newsRoutes);


module.exports = app;