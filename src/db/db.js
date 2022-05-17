const fs = require('fs');
const path = require('path');
const pathModels = path.join(__dirname, './../models');

require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = {};

db.sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	logging: process.env.DB_LOGGING === 'true',
	dialectOptions: {
		ssl: { rejectUnauthorized: false },
	},
});

// Add Models to db
const modelsArray = fs.readdirSync(pathModels);
modelsArray.forEach((file) => {
	const model = file.split('.')[0];
	db[`${model}`] = require(`${pathModels}/${model}`)(db.sequelize);
});

// Assoziations
db.User.hasMany(db.List, { as: 'lists', foreignKey: 'user_id', onDelete: 'cascade' });
db.List.belongsTo(db.User, { foreignKey: 'user_id' });

db.List.hasMany(db.MovieList, { as: 'movies', foreignKey: 'list_id', onDelete: 'cascade' });
db.MovieList.belongsTo(db.List, { foreignKey: 'list_id' });

module.exports = db;
