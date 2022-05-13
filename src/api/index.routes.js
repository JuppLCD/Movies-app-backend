const fs = require('fs');

const express = require('express');
const router = express.Router();

const filesArray = fs.readdirSync(__dirname);

filesArray.forEach((file) => {
	if (!file.includes('.')) {
		router.use(`/${file}`, require(`./${file}/router`));
	}
});

module.exports = router;
