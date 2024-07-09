const app = require('./app');
const env = require('../config/environment');

app.listen(env.port, () => {
  console.log(`News Aggregation running at http://${env.hostname}:${env.port}`);
});
