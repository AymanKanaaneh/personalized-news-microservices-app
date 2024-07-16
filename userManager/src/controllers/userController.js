const userService = require('../services/userService');
const logger = require('../../config/logger');

const customExceptions = require('../exceptions/customExceptions');

const registerUser = async (req, res) => {
  try {

    const userPayload = req.body;
    logger.info('Register user request received', { requestBody: userPayload });

    const result = await userService.registerUser(userPayload);
    
    logger.info('User registered successfully', { result });
    res.status(201).json(result);
  } catch (error) {
    logger.error('Error registering user', { error: error.message });

    if (error instanceof customExceptions.ValidationException) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof customExceptions.NetworkException) {
      res.status(503).json({ error: 'Service unavailable. Please try again later.' });
    } else if (error instanceof customExceptions.TimeoutException) {
      res.status(504).json({ error: 'Request timed out. Please try again later.' });
    } else if (error instanceof customExceptions.DatabaseException) {
      res.status(500).json({ error: 'Internal server error. Please try again later.' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
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

    if (error instanceof customExceptions.ValidationException) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof customExceptions.NetworkException) {
      res.status(503).json({ error: 'Service unavailable. Please try again later.' });
    } else if (error instanceof customExceptions.TimeoutException) {
      res.status(504).json({ error: 'Request timed out. Please try again later.' });
    } else if (error instanceof customExceptions.DatabaseException) {
      res.status(500).json({ error: 'Internal server error. Please try again later.' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
  }
};

const addToEmailsQueue = async (req, res) => {
  try {
    const result = await userService.addToEmailsQueue(req.params.emailAddress);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof customExceptions.ValidationException) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof customExceptions.NetworkException) {
      res.status(503).json({ error: 'Service unavailable. Please try again later.' });
    } else if (error instanceof customExceptions.TimeoutException) {
      res.status(504).json({ error: 'Request timed out. Please try again later.' });
    } else if (error instanceof customExceptions.QueueException) {
      res.status(500).json({ error: 'Failed to add email to queue. Please try again later.' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
  }
};


module.exports = { registerUser, updateUserPreferences, addToEmailsQueue };
