require('dotenv').config();

const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const authJwt = (req, res, next) => {
	const token = req.headers['authorization'];
	if (!token) {
		return next(Boom.unauthorized('Authorization required'));
	}
	jwt.verify(token, process.env.AccessTokenSecret, (err, info) => {
		if (err) {
			return next(Boom.unauthorized('jwt expired'));
		}
		req.tokenInfo = info;
		next();
	});
};

module.exports = authJwt;
