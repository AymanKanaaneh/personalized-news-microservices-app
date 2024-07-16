const express = require('express');
const router = express.Router();

const newsController = require('../controllers/newsController');

router.post('/', newsController.sendEmailNews);

module.exports = router;
