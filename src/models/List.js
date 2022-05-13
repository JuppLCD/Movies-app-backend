const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const List = sequelize.define(
		'List',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'users',
					key: 'id',
				},
				allowNull: false,
			},
		},
		{
			tableName: 'lists',
			timestamps: false,
		}
	);
	return List;
};
