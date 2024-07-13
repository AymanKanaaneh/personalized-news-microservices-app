const Joi = require('joi');

const userPayloadSchema = Joi.object({
  name: Joi.string().min(1).max(50).alphanum().required(),
  email: Joi.string().email().required().email(),
  preferences: Joi.array().items(Joi.string().min(1).max(500).alphanum()).default([])
});

const preferencesPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  preferences: Joi.array().items(Joi.string().min(1).max(500).alphanum()).required()
});

const validateUserPayload = (userPayload) => userPayloadSchema.validate(userPayload);
const validatePreferencesPayload = (preferencesPayload) => preferencesPayloadSchema.validate(preferencesPayload);

module.exports = { validateUserPayload, validatePreferencesPayload };
