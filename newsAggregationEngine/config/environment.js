const hostname = 'localhost';
const port = 3200;
const GEMENI_AI_API_KEY = process.env.GEMENI_AI_API_KEY || "AIzaSyDYNFPrz3UwkQukUv616tZCGJtYK7UrKZ0";
const ZIONET_MAILER_EMAIL = "zionetmailer@gmail.com";
const ZIONET_MAILER_APP_PASS = "ompk umgr yacy rupf";

const daprHost = process.env.DAPR_HOST || 'http://localhost';
const daprPort = process.env.DAPR_HTTP_PORT || '3500';



module.exports = {
    hostname,
    port,
    GEMENI_AI_API_KEY,
    ZIONET_MAILER_EMAIL,
    ZIONET_MAILER_APP_PASS,
    daprHost,
    daprPort
};
