const userService = require('../services/userService');
const logger = require('../../config/logger');

const registerUser = async (req, res) => {
  try {
    logger.info('Register user request received', { requestBody: req.body });
    
    const result = await userService.registerUser(req.body);
    
    logger.info('User registered successfully', { result });
    res.status(201).json(result);
  } catch (error) {
    logger.error('Error registering user', { error: error.message });
    
    // TO DO - Handle different error status codes
    res.status(400).json({ error: error.message });
  }
};
    
const updateUserPreferences = async (req, res) => {
  try {
    logger.info('Update user preferences request received', { emailAddress: req.params.emailAddress, requestBody: req.body });
    
    const emailAddress = req.params.emailAddress;
    const payload = req.body;
    const userPreferencesPayload = { "email": emailAddress, "preferences": payload.preferences };
    
    const result = await userService.updateUserPreferences(userPreferencesPayload);
    
    logger.info('User preferences updated successfully', { result });
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error updating user preferences', { error: error.message });
    res.status(400).json({ error: error.message });
  }
};

const addToEmailsQueue = async (req, res) => {

  try {
    const result = await userService.addToEmailsQueue(req.params.emailAddress);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

module.exports = { registerUser, updateUserPreferences, addToEmailsQueue };
