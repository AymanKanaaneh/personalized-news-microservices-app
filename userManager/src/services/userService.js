const { DaprClient, HttpMethod } = require('@dapr/dapr');
const { daprHost, daprPort } = require('../../config/environment');
const client = new DaprClient(daprHost, daprPort);

const userValidators = require('../validators/userValidators');
const logger = require('../../config/logger');

const registerUser = async (userPayload) => {
  try {
    logger.info('Registering user', { payload: userPayload });

    const { error } = userValidators.validateUserPayload(userPayload);
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

    const { error } = userValidators.validatePreferencesPayload(userPreferencesPayload);
    if (error) {
      const validationError = `Validation failed: ${error.details.map(x => x.message).join(', ')}`;
      logger.error(validationError, { payload: userPreferencesPayload });
      throw new Error(validationError);
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
    logger.error('Error updating user preferences', { error });
    throw error;
  }
};

const addToEmailsQueue = async (userEmailAddress) => {

  try {
    const result = await client.binding.send('emailsqueue', 'create', { email: userEmailAddress });
    return result;
  } catch (error) {
    throw new Error(`Failed to add email to queue: ${error.message}`);
  }
};


module.exports = { registerUser, updateUserPreferences, addToEmailsQueue };
