const path = require('path');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Boom = require('@hapi/boom');

const { User } = require('./db/db');

require('dotenv').config();

const app = express();

const errorHandler = require('./middlewares/errorHandler');

// Import api routes
const routerApi = require('./api/index.routes');

// Settings
app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Router api
app.use('/api/v1', routerApi);

app.use((req, res, next) => {
	next(Boom.notFound('No se a encontrado el recurso solicitado'));
});

app.use(errorHandler);

module.exports = app;
