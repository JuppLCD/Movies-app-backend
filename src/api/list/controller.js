const { User, List, MovieList } = require('./../../db/db');

const mapMoviesId = require('../../utils/mapMoviesId');

const controller = {};

// GET - listas del usuario
controller.getLists = async (req, res, next) => {
	const { id } = req.tokenInfo;
	try {
		const UserLists = await User.findOne({
			where: { id },
			attributes: ['name'],
			include: {
				as: 'lists',
				model: List,
				attributes: ['name', 'id'],
			},
		});
		if (UserLists === null) {
			throw new Error();
		}
		res.json(UserLists);
	} catch (err) {
		next(err.menssage);
	}
};

// POST - crear lista
controller.createList = async (req, res, next) => {
	const { id } = req.tokenInfo;
	try {
		if (!req.body?.name || !String(req.body.name).trim()) {
			throw new Error('Falta el nombre de la lista de peliculas');
		}
		const name = String(req.body.name);
		const UserLists = await User.findOne({
			where: { id },
		});
		if (UserLists === null) {
			throw new Error('Error al buscar el usuario');
		}
		const newList = await List.create({ user_id: id, name });
		if (newList === null) {
			throw new Error('Error al crear la lista');
		}
		res.json({ listId: newList.id });
	} catch (err) {
		next(err.menssage);
	}
};

// PUT - cambiar nombre a lista
controller.updateNameList = async (req, res, next) => {
	const { id } = req.tokenInfo;
	try {
		if (!req.body?.name || !req.params?.idList | !String(req.body.name).trim()) {
			throw new Error('Error: faltan datos');
		}
		const { name } = req.body;
		const { idList } = req.params;
		const UserLists = await User.findOne({
			where: { id },
		});
		if (UserLists === null) {
			throw new Error('Error al buscar el usuario');
		}
		const newList = await List.update({ name }, { where: { id: idList, user_id: id } });

		if (newList === null) {
			throw new Error('Error al cambiar el nombre a la lista');
		}
		res.status(204).end();
	} catch (err) {
		next(err.menssage);
	}
};

// DELETE - eliminar lista
controller.deleteList = async (req, res, next) => {
	const { id } = req.tokenInfo;
	try {
		if (!req.params?.idList) {
			throw new Error('Falta el id de la lista de peliculas');
		}
		const { idList } = req.params;
		const UserLists = await User.findOne({
			where: { id },
		});
		if (UserLists === null) {
			throw new Error('Error al buscar el usuario');
		}
		const Delete = await List.destroy({ where: { id: idList, user_id: id } });
		if (Delete === null) {
			throw new Error('Error al eliminar la lista');
		}
		res.status(204).end();
	} catch (err) {
		next(err.menssage);
	}
};

// ----------------------
// ----------------------
// MOVIES
// ----------------------
// ----------------------

// GET - todas las peliculas de una lista
controller.getMovies = async (req, res, next) => {
	const { id } = req.tokenInfo;
	const { idList } = req.params;
	try {
		const Movies = await User.findOne({
			where: { id },
			attributes: ['name'],
			include: {
				as: 'lists',
				model: List,
				where: { id: idList },
				attributes: ['name'],
				include: {
					as: 'movies',
					model: MovieList,
					attributes: ['movie'],
				},
			},
		});
		if (Movies === null) {
			throw new Error();
		}
		const MoviesJSON = mapMoviesId(Movies);
		res.json(MoviesJSON);
	} catch (err) {
		next(err.menssage);
	}
};

// POST - añadir movie a una lista
controller.addMovie = async (req, res, next) => {
	const { id } = req.tokenInfo;
	try {
		if (!req.params?.movie || !req.params?.idList) {
			throw new Error('Error: faltan datos');
		}
		const { idList } = req.params;
		const { movie } = req.params;

		if (Number(movie) === NaN) {
			res.status(400).end();
		}
		const UserList = await User.findOne({
			where: { id },
			attributes: ['name'],
			include: {
				as: 'lists',
				model: List,
				where: { id: idList },
				include: {
					as: 'movies',
					model: MovieList,
					attributes: ['movie'],
				},
			},
		});
		if (UserList === null) {
			throw new Error(`Error: No se ha encontrado la lista con id "${idList}" en el usuario`);
		}
		const MoviesJSON = mapMoviesId(UserList);
		if (MoviesJSON.lists[0].movies.includes(Number(movie))) {
			res.status(204).end();
			return;
		}
		const Movies = await MovieList.create({ list_id: idList, movie: Number(movie) });
		if (Movies === null) {
			throw new Error('Error: No se pudo añadir la pelicula a la lista');
		}
		res.status(204).end();
	} catch (err) {
		next(err.menssage);
	}
};

// DELETE - eliminar movie de una lista
controller.deleteMovie = async (req, res, next) => {
	const { id } = req.tokenInfo;
	try {
		if (!req.params?.movie || !req.params?.idList) {
			throw new Error('Error: faltan datos');
		}
		const { idList } = req.params;
		const { movie } = req.params;
		const UserList = await User.findOne({
			where: { id },
			attributes: ['name'],
			include: {
				as: 'lists',
				model: List,
				where: { id: idList },
			},
		});
		if (UserList === null) {
			throw new Error(`Error: No se ha encontrado la lista con id "${idList}" en el usuario`);
		}
		const Delete = await MovieList.destroy({ where: { movie } });
		if (Delete === null) {
			throw new Error('Error al eliminar la pelicula de la lista');
		}
		res.status(204).end();
	} catch (err) {
		next(err.menssage);
	}
};

module.exports = controller;
