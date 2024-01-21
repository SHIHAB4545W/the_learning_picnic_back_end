const express = require('express');
const router = express.Router();

const submitController = require('../controllers/userAnswer.controller');

router.route('/:quizId')
.post (submitController.createUserAnswer)
 router.route('/')
.get(submitController.getAllAnwnser)



module.exports = router;