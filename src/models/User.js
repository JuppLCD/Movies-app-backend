const { DataTypes } = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
	const User = sequelize.define(
		'User',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'users',
			timestamps: false,
		}
	);

	User.encryptPassword = async (password) => {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	};

	User.comparePassword = async (password, receivedPassword) => {
		return await bcrypt.compare(password, receivedPassword);
	};
	return User;
};
