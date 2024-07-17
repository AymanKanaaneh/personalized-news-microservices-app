const hostName = process.env.HOST_NAME || 'http://localhost';
const port = process.env.PORT || 3000;
const daprHost = process.env.DAPR_HOST || 'http://localhost';
const daprPort = process.env.DAPR_HTTP_PORT || '3500';
const SWAGGER_USER_MANAGER_SERVICE_URL = `http://localhost:${port}/`;



module.exports = {
    hostName,
    port,
    daprHost,
    daprPort,
    SWAGGER_USER_MANAGER_SERVICE_URL
};
