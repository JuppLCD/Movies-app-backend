const Boom = require('@hapi/boom');
const { userSchemaRegister } = require('./../validation/userSchema');

const validUser = async (req, res, next) => {
	const user = req.body;
	user.password = user?.password.trim();
	user.passwordConfirm = user?.passwordConfirm.trim();
	try {
		await userSchemaRegister.validateAsync(user, { abortEarly: false });
	} catch (err) {
		next(Boom.badRequest(err.message));
	}

	next();
};

module.exports = validUser;
