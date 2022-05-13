require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (id, expiresIn = '2 days') => {
	const token = jwt.sign({ id }, process.env.AccessTokenSecret, { expiresIn });
	return token;
};
