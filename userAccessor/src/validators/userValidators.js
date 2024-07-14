const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(1).max(50).required().alphanum(),
  email: Joi.string().email().required().email(),
  preferences: Joi.array().items(Joi.string().min(1).max(50).alphanum()).default([])
});


const preferencesSchema = Joi.object({
  email: Joi.string().email().required(),
  preferences: Joi.array().items(Joi.string().min(1).max(50).alphanum()).default([])
});

const userSchemaEmail = userSchema.extract('email');

const validateUserPayload = (payload) => userSchema.validate(payload);
const validatePreferencesPayload = (payload) => preferencesSchema.validate(payload);
const validateUserEmail = (userEmailAddress) => userSchemaEmail.validate(userEmailAddress);

module.exports = { validateUserPayload, validatePreferencesPayload, validateUserEmail };
