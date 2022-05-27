const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const MovieList = sequelize.define(
		'MovieList',
		{
			list_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'lists',
					key: 'id',
				},
				allowNull: false,
			},
			movie: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			tableName: 'MoviesList',
			timestamps: false,
		}
	);
	return MovieList;
};
