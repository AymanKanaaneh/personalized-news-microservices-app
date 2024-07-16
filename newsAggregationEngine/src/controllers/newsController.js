const newsAggregationService = require('../services/newsAggregationService');
const logger = require('../../config/logger');
const customsException = require('../exceptions/customExceptions');

const sendEmailNews = async (req, res) => {
    const userEmailAddress = req.body.email;

    try {
        logger.info(`Received request to pick news for user: ${userEmailAddress}`);

        const news = await newsAggregationService.pickUserNews(userEmailAddress);
        logger.info(`Successfully picked news for user: ${userEmailAddress}`);

        res.status(200).json(news);
    } catch (error) {
        logger.error(`Error picking news for user: ${userEmailAddress} - ${error.message}`);

        if (error instanceof customsException.ValidationException) {
            res.status(400).json({ error: `Validation error: ${error.message}` });
        } else if (error instanceof customsException.NetworkException) {
            res.status(503).json({ error: `Service unavailable: ${error.message}` });
        } else if (error instanceof customsException.TimeoutException) {
            res.status(504).json({ error: `Request timed out: ${error.message}` });
        } else if (error instanceof customsException.ContentGenerationException) {
            res.status(500).json({ error: `Error generating content: ${error.message}` });
        } else if (error instanceof customsException.NewsSendingException) {
            res.status(502).json({ error: `Error sending news: ${error.message}` });
        } else {
            res.status(500).json({ error: `An unexpected error occurred: ${error.message}` });
        }
    }
};

module.exports = {
    sendEmailNews
};