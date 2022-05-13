const Joi = require('joi');

const userSchemaRegister = Joi.object({
	name: Joi.string().alphanum().min(5).max(20).trim().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\\s]{3,30}$')).required(),
	passwordConfirm: Joi.ref('password'),
}).with('password', 'passwordConfirm');

const userSchemaLogin = Joi.object({
	name: Joi.string().alphanum().min(5).max(20).trim().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9\\s]{3,30}$')).trim().required(),
	passwordConfirm: Joi.any().optional(),
});

module.exports = { userSchemaRegister, userSchemaLogin };
