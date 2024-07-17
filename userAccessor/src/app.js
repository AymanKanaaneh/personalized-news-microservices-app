const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/user', userRoutes);

module.exports = app;