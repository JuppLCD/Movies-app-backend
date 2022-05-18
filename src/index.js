const app = require('./app');
const { sequelize } = require('./db/db');

app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);

	sequelize
		.sync({ force: false })
		.then(() => {
			console.log('Nos hemos conectado a la base de datos');
		})
		.catch((error) => {
			console.log('Se ha producido un error: ', error);
		});
});
