require('dotenv').config();

const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const { userSchemaLogin } = require('./../validation/userSchema');

const validLogin = async (req, res, next) => {
	const token = req.headers['authorization'];
	const user = {
		password: String(req.body?.password).trim(),
		name: String(req.body?.name).trim(),
	};
	if (token) {
		jwt.verify(token.trim(), process.env.AccessTokenSecret, (err, info) => {
			if (err) {
				return next(Boom.unauthorized(err.message));
			}
			req.userInfo = { token: true, user: { id: info.id } };
		});
	} else {
		try {
			await userSchemaLogin.validateAsync(user, { abortEarly: false });
			req.userInfo = {
				token: false,
				user,
			};
		} catch (err) {
			console.error(err);
			let message = err.details.map((err) => err.message);
			next(Boom.badRequest(message));
		}
	}
	next();
};

module.exports = validLogin;
