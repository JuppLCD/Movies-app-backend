const { User, List, MovieList } = require('./../../db/db');

const createToken = require('./../../utils/createToken');
const mapMoviesId = require('../../utils/mapMoviesId');

const Boom = require('@hapi/boom');

const controller = {};

controller.info = async (req, res, next) => {
	const { id } = req.tokenInfo;

	try {
		const UserInfo = await User.findOne({
			where: { id },
			attributes: ['name'],
			include: {
				as: 'lists',
				model: List,
				attributes: ['name'],
				include: {
					as: 'movies',
					model: MovieList,
					attributes: ['movie'],
				},
			},
		});
		if (UserInfo === null) {
			throw new Error();
		}
		const UserInfoJSON = mapMoviesId(UserInfo);
		res.json(UserInfoJSON);
	} catch (err) {
		next(err.menssage);
	}
};

controller.login = async (req, res, next) => {
	try {
		if (req.userInfo.token) {
			const userExist = await User.findOne({ where: { id: req.userInfo.user.id } });
			if (!userExist) {
				throw next(Boom.unauthorized());
			}
			return res.status(204).end();
		}
		const { password, name } = req.userInfo.user;

		const user = await User.findOne({ where: { name } });
		if (!user) {
			next(Boom.unauthorized('Usuario o contraseña no valido'));
		}
		const validPassword = await User.comparePassword(password, user.password);
		if (!validPassword) {
			next(Boom.unauthorized('Usuario o contraseña no valido'));
		}

		const accessToken = createToken(user.id);
		res.json({ accessToken });
	} catch (err) {
		next(err.menssage);
	}
};

controller.register = async (req, res, next) => {
	const { name, password } = req.body;
	try {
		const userExist = await User.findOne({ where: { name } });
		if (userExist) {
			next(Boom.conflict('User exist'));
		}
		const newPassword = await User.encryptPassword(password);

		const newUser = await User.create({
			name,
			password: newPassword,
		});

		await List.create({ user_id: newUser.id, name: 'Likes' });

		const accessToken = createToken(newUser.id);
		res.json({ accessToken });
	} catch (err) {
		next(err.menssage);
	}
};

module.exports = controller;
