const newsAggregationService = require('../services/newsAggregationService');
const logger = require('../../config/logger');

const pickUserNews = async (req, res) => {

    let userEmailAddress;
    
    try {
        userEmailAddress = req.params.userEmailAddress;
        logger.info(`Received request to pick news for user: ${userEmailAddress}`);

        const news = await newsAggregationService.pickUserNews(userEmailAddress);
        logger.info(`Successfully picked news for user: ${userEmailAddress}`);

        res.status(200).json(news);
    } catch (error) {
        logger.error(`Error picking news for user: ${userEmailAddress} - ${error.message}`);
        res.status(400).json({ error: error.message });
    }

};

module.exports = {
    pickUserNews
};