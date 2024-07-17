const { DaprClient, HttpMethod } = require('@dapr/dapr');
const { daprHost, daprPort } = require('../../config/environment');
const client = new DaprClient(daprHost, daprPort);

const userValidators = require('../validators/userValidators');
const logger = require('../../config/logger');
const customExceptions = require('../exceptions/customExceptions');

/**
 * Registers a new user using the user-accessor service via Dapr invocation.
 * @param {Object} userPayload - The user data payload to register.
 * @returns {Promise<Object>} - The result of user registration.
 * @throws {ValidationException} If user data validation fails.
 * @throws {NetworkException} If user-accessor service is unreachable.
 * @throws {TimeoutException} If user-accessor service does not respond in time.
 * @throws {DatabaseException} If a database error occurs during registration.
 */
const registerUser = async (userPayload) => {
  try {
    logger.info('Registering user', { payload: userPayload });

    const { error } = userValidators.validateUserPayload(userPayload);
    if (error) {
      const validationError = `Validation failed: ${error.details.map(x => x.message).join(', ')}`;
      logger.error(validationError, { payload: userPayload });
      throw new customExceptions.ValidationException(validationError);
    }

    const result = await client.invoker.invoke(
      'user-accessor',
      'user/register',
      HttpMethod.POST,
      userPayload
    );

    logger.info('User registered successfully', { result });
    return result;
  } catch (error) {
    if (error instanceof customExceptions.ValidationException) {
      logger.error('Validation error while registering user', { error });
      throw error;
    } else if (error.code === 'ENOTFOUND') {
      logger.error('Network error while registering user', { error });
      throw new customExceptions.NetworkException('Network error: user-accessor service not reachable.');
    } else if (error.code === 'ETIMEDOUT') {
      logger.error('Timeout error while registering user', { error });
      throw new customExceptions.TimeoutException('Timeout error: user-accessor service did not respond in time.');
    } else {
      logger.error('Database error while registering user', { error });
      throw new customExceptions.DatabaseException('Failed to register user due to a database error.');
    }
  }
};

/**
 * Updates user preferences using the user-accessor service via Dapr invocation.
 * @param {Object} userPreferencesPayload - The payload containing user email and preferences.
 * @returns {Promise<Object>} - The result of user preferences update.
 * @throws {ValidationException} If preferences payload validation fails.
 * @throws {NetworkException} If user-accessor service is unreachable.
 * @throws {TimeoutException} If user-accessor service does not respond in time.
 * @throws {DatabaseException} If a database error occurs during update.
 */
const updateUserPreferences = async (userPreferencesPayload) => {
  try {
    logger.info('Updating user preferences', { payload: userPreferencesPayload });

    const { error } = userValidators.validatePreferencesPayload(userPreferencesPayload);
    if (error) {
      const validationError = `Validation failed: ${error.details.map(x => x.message).join(', ')}`;
      logger.error(validationError, { payload: userPreferencesPayload });
      throw new customExceptions.ValidationException(validationError);
    }

    const result = await client.invoker.invoke(
      'user-accessor',
      'user/preferences/update',
      HttpMethod.PUT,
      userPreferencesPayload
    );

    logger.info('User preferences updated successfully', { result });
    return result;
  } catch (error) {
    if (error instanceof customExceptions.ValidationException) {
      logger.error('Validation error while updating user preferences', { error });
      throw error;
    } else if (error.code === 'ENOTFOUND') {
      logger.error('Network error while updating user preferences', { error });
      throw new customExceptions.NetworkException('Network error: user-accessor service not reachable.');
    } else if (error.code === 'ETIMEDOUT') {
      logger.error('Timeout error while updating user preferences', { error });
      throw new customExceptions.TimeoutException('Timeout error: user-accessor service did not respond in time.');
    } else {
      logger.error('Database error while updating user preferences', { error });
      throw new customExceptions.DatabaseException('Failed to update user preferences due to a database error.');
    }
  }
};


/**
 * Adds user email to the emails queue using Dapr binding.
 * @param {string} userEmailAddress - The email address to add to the queue.
 * @returns {Promise<Object>} - The result of adding email to the queue.
 * @throws {ValidationException} If email validation fails.
 * @throws {NetworkException} If emailsqueue service is unreachable.
 * @throws {TimeoutException} If emailsqueue service does not respond in time.
 * @throws {QueueException} If an error occurs while adding email to the queue.
 */
const addToEmailsQueue = async (userEmailAddress) => {
  try {
    const { error } = userValidators.validateUserEmail(userEmailAddress);

    if (error) {
      const validationError = `Validation failed: ${error.details.map(x => x.message).join(', ')}`;
      throw new customExceptions.ValidationException(validationError);
    }

    const result = await client.binding.send('emailsqueue', 'create', { email: userEmailAddress });
    return { message: "Request successfully added to the emails queue - Sending personalized news updates based on your preferences....." };
  } catch (error) {
    if (error instanceof customExceptions.ValidationException) {
      logger.error('Validation error while adding email to queue', { error });
      throw error;
    } else if (error.code === 'ENOTFOUND') {
      logger.error('Network error while adding email to queue', { error });
      throw new customExceptions.NetworkException('Network error: emailsqueue service not reachable.');
    } else if (error.code === 'ETIMEDOUT') {
      logger.error('Timeout error while adding email to queue', { error });
      throw new customExceptions.TimeoutException('Timeout error: emailsqueue service did not respond in time.');
    } else {
      logger.error('Error while adding email to queue', { error });
      throw new customExceptions.QueueException(`Failed to add email to queue: ${error.message}`);
    }
  }
};


module.exports = { registerUser, updateUserPreferences, addToEmailsQueue };
