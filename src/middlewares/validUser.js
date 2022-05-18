const Boom = require('@hapi/boom');
const { userSchemaRegister } = require('./../validation/userSchema');

const validUser = async (req, res, next) => {
	const user = {
		password: String(req.body?.password).trim(),
		name: String(req.body?.name).trim(),
		passwordConfirm: String(req.body?.passwordConfirm).trim(),
	};
	try {
		await userSchemaRegister.validateAsync(user, { abortEarly: false });
	} catch (err) {
		next(Boom.badRequest(err.message));
	}

	next();
};

module.exports = validUser;
