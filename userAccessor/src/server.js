const app = require('./app');
const env = require('../config/environment');
const dbConfig = require('../config/db');

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(dbConfig.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(env.port, () => {
  console.log(`User Accessor running at http://${env.hostname}:${env.port}`);
});
