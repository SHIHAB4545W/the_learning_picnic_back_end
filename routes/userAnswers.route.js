const express = require("express")
const router = express.Router();
const userAnswersController = require("../controllers/userAnswers.controller");
const verifyToken = require("../middleware/verifyToken");

router.route('/:id')
    .post(verifyToken, userAnswersController.sumbitUserAnswers)



module.exports = router;