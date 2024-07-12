const { DaprClient, HttpMethod } = require('@dapr/dapr');
const { daprHost, daprPort } = require('../../config/environment');
const { validateUserPayload, validatePreferencesPayload } = require('../validators');
//const logger = require('../logger');

const client = new DaprClient(daprHost, daprPort);

const registerUser = async (userPayload) => {
  try {
    
    const { error } = validateUserPayload(userPayload);
    if (error) {
      throw new Error(`Validation failed: ${error.details.map(x => x.message).join(', ')}`);
    }

    const result = await client.invoker.invoke(
      'user-accessor',
      'user/register',
      HttpMethod.POST,
      userPayload
    );

    return result;
  } catch (error) {
    //logger.error(`Error registering user: ${error.message}`);
    throw error;
  }
};

const updateUserPreferences = async (preferencesPayload) => {
  try {
    // Validate preferencesPayload
    const { error } = validatePreferencesPayload(preferencesPayload);
    if (error) {
      throw new Error(`Validation failed: ${error.details.map(x => x.message).join(', ')}`);
    }

    const result = await client.invoker.invoke(
      'user-accessor',
      'user/:emailAddress/preferences',
      HttpMethod.POST,
      preferencesPayload
    );

    return result;
  } catch (error) {
    // logger.error(`Error updating user preferences: ${error.message}`);
    throw error;
  }
};

module.exports = { registerUser, updateUserPreferences };
