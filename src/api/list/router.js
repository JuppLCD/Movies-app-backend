const express = require('express');
const router = express.Router();

// Middlewares
const authJwt = require('../../middlewares/authJwt');

// Controllers
const { getLists, createList, updateNameList, deleteList, getMovies, addMovie, deleteMovie } = require('./controller');

router.get('/', authJwt, getLists);
router.post('/create', authJwt, createList); // { name : string }
router.put('/update/:idList', authJwt, updateNameList); // { name :string }
router.delete('/delete/:idList', authJwt, deleteList);

router.get('/:idList/movies', authJwt, getMovies);
router.post('/:idList/movies/add/:movie', authJwt, addMovie);
router.delete('/:idList/movies/remove/:movie', authJwt, deleteMovie);

module.exports = router;
