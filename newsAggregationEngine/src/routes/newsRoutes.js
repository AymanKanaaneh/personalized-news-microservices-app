const express = require('express');
const router = express.Router();

const newsController = require('../controllers/newsController');


router.get('/:userId', newsController.pickUserNews);


module.exports = router;
