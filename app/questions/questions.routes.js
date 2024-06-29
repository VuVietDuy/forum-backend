const express = require('express')
const router = express.Router()
const questionsController = require('./questions.controllers')
const { isAuth } = require('../../middlewares/auth.middleware')

router.post('/', isAuth, questionsController.createNewQuestion)
router.get('/', questionsController.getAllQuestion)
router.get('/:id', questionsController.getQuestionById)

module.exports = router