const app = require('./app');
const env = require('../config/environment');
const dbConfig = require('../config/db');
const logger = require('../config/logger');

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(dbConfig.MONGODB_URI);
const db = mongoose.connection;
db.on('error', logger.error.bind(console, 'MongoDB connection error:'));

app.listen(env.port, () => {
  logger.info(`User Accessor running at http://${env.hostName}:${env.port}`);
});
