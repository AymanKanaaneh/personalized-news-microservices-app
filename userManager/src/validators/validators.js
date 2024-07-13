const Joi = require('joi');

const userPayloadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  preferences: Joi.array().items(Joi.string()).default([])
});

const preferencesPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  preferences: Joi.array().items(Joi.string()).required()
});

const validateUserPayload = (payload) => userPayloadSchema.validate(payload);
const validatePreferencesPayload = (payload) => preferencesPayloadSchema.validate(payload);

module.exports = { validateUserPayload, validatePreferencesPayload };
