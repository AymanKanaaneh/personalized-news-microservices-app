const app = require('./app');
const env = require('../config/environment');
const logger = require('../config/logger');

app.listen(env.port, () => {
  logger.info(`User service running at http://${env.hostName}:${env.port}`);
});
