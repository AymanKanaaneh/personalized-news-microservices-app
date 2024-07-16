const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.registerUser);

router.post('/news/emailsqueue/:emailAddress', userController.addToEmailsQueue);

router.put('/preferences/:emailAddress', userController.updateUserPreferences)


module.exports = router;
