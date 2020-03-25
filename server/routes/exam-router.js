const express = require('express')

const MovieCtrl = require('../controllers/exam-ctrl')

const router = express.Router()

router.post('/exam', MovieCtrl.createMovie)
router.put('/exam/:id', MovieCtrl.updateMovie)
router.delete('/exam/:id', MovieCtrl.deleteMovie)
router.get('/exam/:name', MovieCtrl.getMovieByName)
router.get('/exams', MovieCtrl.getMovies)

module.exports = router