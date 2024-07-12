const hostname = 'user-manager';
const port = 3000;
const daprHost = process.env.DAPR_HOST || 'http://localhost';
const daprPort = process.env.DAPR_HTTP_PORT || '3500';


module.exports = {
    hostname,
    port,
    daprHost,
    daprPort
};
