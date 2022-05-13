const express = require('express');
const router = express.Router();

// Middlewares
const validUser = require('./../../middlewares/validUser');
const validLogin = require('../../middlewares/validLogin');
const authJwt = require('../../middlewares/authJwt');

// Controllers
const { login, register, info } = require('./controller');

router.post('/register', validUser, register);
router.post('/login', validLogin, login);
router.get('/info', authJwt, info);

module.exports = router;
