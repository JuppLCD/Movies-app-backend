const errorHandler = (error, req, res, next) => {
	if (error.isBoom) {
		const { output } = error;
		res.status(output.statusCode).json(output.payload);
	} else {
		const message = typeof error === 'string' ? error : error.message ?? error.menssage;
		res.status(500).json({
			statusCode: 500,
			error: 'internal Server Error',
			menssage: message,
		});
	}
};

module.exports = errorHandler;
