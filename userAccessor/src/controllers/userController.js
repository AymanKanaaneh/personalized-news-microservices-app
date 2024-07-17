const userService = require('../services/userService');
const userValidators = require('../validators/userValidators');
const customExceptions = require('../exceptions/customExceptions');

const registerUser = async (req, res) => {

  try {
    const { error } = userValidators.validateUserPayload(req.body);
    if (error) {
      throw new customExceptions.ValidationException(error.message);
    }
    
    const user = await userService.createUser(req.body); 
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof customExceptions.ValidationException) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof customExceptions.DatabaseException) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};


const getUserPreferences = async (req, res) => {
  try {

    const userEmailAddress = req.params.userEmailAddress;
    const { error } = userValidators.validateUserEmail(userEmailAddress);
    if (error) {
      throw new customExceptions.ValidationException(error.message);
    }

    const preferences = await userService.getUserPreferences(userEmailAddress);
    
    if (!preferences) {
      res.status(404).json({ error: 'Preferences not found' });
    } else {
      res.status(200).json(preferences);
    }

  } catch (error) {
    if (error instanceof customExceptions.ValidationException) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof customExceptions.DatabaseException) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};


const updateUserPreferences = async (req, res) => {
  try {

    const userPreferencesPayload = req.body;
    const { error } = userValidators.validatePreferencesPayload(userPreferencesPayload);
    if (error) {
      throw new customExceptions.ValidationException(error.message);
    }

    const updatedUserPreferences = await userService.updateUserPreferences(userPreferencesPayload);

    if (!updatedUserPreferences) {
      res.status(404).json({ error: 'User preferences not found' });
    } else {
      res.status(200).json(updatedUserPreferences);
    }

  } catch (error) {
    if (error instanceof customExceptions.ValidationException) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof customExceptions.DatabaseException) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};


module.exports = { registerUser, getUserPreferences, updateUserPreferences };
