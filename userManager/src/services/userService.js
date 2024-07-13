const { DaprClient, HttpMethod } = require('@dapr/dapr');
const { daprHost, daprPort } = require('../../config/environment');
const { validateUserPayload, validatePreferencesPayload } = require('../validators/validators');
const logger = require('../../config/logger');

const client = new DaprClient(daprHost, daprPort);

const registerUser = async (userPayload) => {
  try {
    logger.info('Registering user', { payload: userPayload });

    const { error } = validateUserPayload(userPayload);
    if (error) {
      const validationError = `Validation failed: ${error.details.map(x => x.message).join(', ')}`;
      logger.error(validationError, { payload: userPayload });
      throw new Error(validationError);
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
    logger.error('Error registering user', { error });
    throw error;
  }
};

const updateUserPreferences = async (userPreferencesPayload) => {
  try {
    logger.info('Updating user preferences', { payload: userPreferencesPayload });

    const { error } = validatePreferencesPayload(userPreferencesPayload);
    if (error) {
      const validationError = `Validation failed: ${error.details.map(x => x.message).join(', ')}`;
      logger.error(validationError, { payload: userPreferencesPayload });
      throw new Error(validationError);
    }

    const result = await client.invoker.invoke(
      'user-accessor',
      'user/preferences',
      HttpMethod.PUT,
      userPreferencesPayload
    );

    logger.info('User preferences updated successfully', { result });
    return result;
  } catch (error) {
    logger.error('Error updating user preferences', { error });
    throw error;
  }
};

module.exports = { registerUser, updateUserPreferences };
