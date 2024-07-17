const swaggerJSDoc = require('swagger-jsdoc');
const { SWAGGER_USER_MANAGER_SERVICE_URL } = require('../config/environment');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Manger API',
            version: '1.0.0',
            description: 'API for managing users and their preferences',
        },
        servers: [
            {
                url: SWAGGER_USER_MANAGER_SERVICE_URL,
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;