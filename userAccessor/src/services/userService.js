const User = require('../models/user');
const userValidators = require('../validators/userValidators');
const logger = require('../../config/logger');
const customExceptions = require('../exceptions/customExceptions');

/**
 * Creates a new user.
 * @param {Object} userData - The user data to create.
 * @returns {Promise<Object>} - The saved user object.
 * @throws {ValidationException} If user data validation fails.
 * @throws {DatabaseException} If user creation fails.
 */
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


/**
 * Retrieves user preferences by email address.
 * @param {string} userEmailAddress - The email address of the user.
 * @returns {Promise<Object>} - The user's preferences.
 * @throws {ValidationException} If email validation fails.
 * @throws {DatabaseException} If user retrieval fails.
 */
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


/**
 * Updates user preferences.
 * @param {Object} userPreferencesPayload - The payload containing user email and preferences.
 * @returns {Promise<Object|null>} - The updated user object, or null if user not found.
 * @throws {ValidationException} If preferences validation fails.
 * @throws {DatabaseException} If user update fails.
 */
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
      throw new customExceptions.DatabaseException('User not found');
    }
    logger.info(`User prefernces updated successfully: ${updatedUser}`);
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
