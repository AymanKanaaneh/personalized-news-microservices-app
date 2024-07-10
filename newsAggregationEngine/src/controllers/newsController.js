const newsAggregationService = require('../services/newsAggregationService');;

const pickUserNews = async (req, res) => {
    
    try {
        const userEmailAddress = req.params.userEmailAddress;
        const news = await newsAggregationService.pickUserNews(userEmailAddress);
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

module.exports = {
    pickUserNews
};