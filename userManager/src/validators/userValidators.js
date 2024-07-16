const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(1).max(50).alphanum().required(),
  email: Joi.string().email().required().email(),
  preferences: Joi.array().items(Joi.string().min(1).max(500).alphanum()).default([])
});

const preferencesSchema = Joi.object({
  email: Joi.string().email().required(),
  preferences: Joi.array().items(Joi.string().min(1).max(500).alphanum()).required()
});

const userSchemaEmail = userSchema.extract('email');

const validateUserPayload = (userPayload) => userSchema.validate(userPayload);
const validatePreferencesPayload = (preferencesPayload) => preferencesSchema.validate(preferencesPayload);
const validateUserEmail = (userEmailAddress) => userSchemaEmail.validate(userEmailAddress);

module.exports = { validateUserPayload, validatePreferencesPayload, validateUserEmail };
