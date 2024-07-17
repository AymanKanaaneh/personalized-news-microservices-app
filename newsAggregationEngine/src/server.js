const app = require('./app');
const env = require('../config/environment');
const logger = require('../config/logger');

app.listen(env.port, () => {
  logger.info(`News Aggregation running at http://${env.hostname}:${env.port}`);
});
