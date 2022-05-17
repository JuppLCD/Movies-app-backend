module.exports = function mapMoviesId(sequelizeData) {
	const newData = sequelizeData.toJSON();
	newData.lists.map((list) => {
		list.movies = list.movies.map((movie) => movie.movie);
	});
	return newData;
};
