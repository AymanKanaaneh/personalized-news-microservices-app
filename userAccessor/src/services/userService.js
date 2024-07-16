const User = require('../models/user');
const userValidators = require('../validators/userValidators');
const logger = require('../../config/logger');
const customExceptions = require('../exceptions/customExceptions');

const createUser = async (userData) => {
  try {
    const { error } = userValidators.validateUserPayload(userData);

    if (error) {
      throw new customExceptions.ValidationException('Invalid user data: ' + error.message);
    }

    const user = new User(userData);
    const savedUser = await user.save();

    logger.info('User created successfully', { userId: savedUser._id });

    return savedUser;
  } catch (error) {
    logger.error('User creation failed', { error: error.message });
    throw new customExceptions.DatabaseException('Failed to create user');
  }
};
const getUserPreferences = async (userEmailAddress) => {

  try {
    
    const { error } = userValidators.validateUserEmail(userEmailAddress);

    if (error) {
      throw new customExceptions.ValidationException('Invalid email address: ' + error.message);
    }

    const user = await User.findOne({ email: userEmailAddress }).select('preferences');

    if (!user) {
      throw new customExceptions.DatabaseException('User not found');
    }

    return user.preferences;

  }catch(error) {

    if (error instanceof customExceptions.ValidationException) {
      logger.error('Validation error:', { error: error.message });
    } else if (error instanceof customExceptions.DatabaseException) {
      logger.error('Database error:', { error: error.message });
    } else {
      logger.error('Unexpected error:', { error: error.message });
    }

    throw error;
  }
};


const updateUserPreferences = async (userPreferencesPayload) => {
  try {
    const { error } = userValidators.validatePreferencesPayload(userPreferencesPayload);

    if (error) {
      throw new customExceptions.ValidationException(error.message);
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: userPreferencesPayload.email },
      { preferences: userPreferencesPayload.preferences },
      { new: true }
    );

    if (!updatedUser) {
      logger.warn(`User with email ${userPreferencesPayload.email} not found.`);
      return null;
    }

    console.log('Updated User:', updatedUser);
    return updatedUser;
  } catch (error) {
    if (error instanceof customExceptions.ValidationException) {
      logger.error(`Validation error: ${error.message}`);
    } else if (error instanceof customExceptions.DatabaseException) {
      logger.error(`Database error: ${error.message}`);
    } else {
      logger.error(`Unexpected error: ${error.message}`);
    }
    throw error;
  }
};



module.exports = { createUser, getUserPreferences, updateUserPreferences };
