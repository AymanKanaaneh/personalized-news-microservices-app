const app = require('./app');
const env = require('../config/environment');

app.listen(env.port, () => {
  console.log(`User Accessor running at http://${env.hostname}:${env.port}`);
});
