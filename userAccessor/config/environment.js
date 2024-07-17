const hostName = process.env.HOST_NAME || 'http://localhost';
const port = process.env.PORT || 3100;
const SWAGGER_USER_ACCESSOR_SERVICE_URL = `http://localhost:${port}/`;


module.exports = {
    hostName,
    port,
    SWAGGER_USER_ACCESSOR_SERVICE_URL
};
