const express = require('express');
const router = express.Router();
const reportController =require('../controllers/report.controller')

router.route('/:userId')
.get(reportController.reportStudent )

router.route('/:userId/:quizId')
.get(reportController.singleReportforStudent)

module.exports = router;