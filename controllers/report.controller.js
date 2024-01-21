
const asyncWrapper = require("../middleware/asyncWrapper")
const httpStatusText = require("../utils/httpStatusText")
const appError = require("../utils/appError")
const quiz_Result= require('../models/quizResult.model')
const report_Result =require('../models/report.model')

const reportStudent = asyncWrapper(async (req, res,next) => {

    
    const userId = req.params.userId

    const reportFeedback = await quiz_Result.find({userId:userId});

    for (let i = 0; i < reportFeedback.length-1; i++){
    

                let quizId =reportFeedback[i].quizGrade[0].quizId;
                let grade =reportFeedback[i].quizGrade[0].grade;


    const  report = new report_Result({
        quizGrade:[{
            quizId:quizId,
            grade:grade
        }],
        userId:userId


    })  
    for(let j = 1; j < reportFeedback.length; j++){

                report.quizGrade.push({
                    quizId:reportFeedback[j].quizGrade[0].quizId,
                    grade:reportFeedback[j].quizGrade[0].grade
                })
                await report.save();
    
             
                res.status(200).json({ status: httpStatusText.SUCCESS, data: { report } });
            }
            }
    
 
               



})

const singleReportforStudent =asyncWrapper(async (req, res,next) => {
const userId = req.params.userId
const quizId =req.params.quizId
    const singleReport = await report_Result.find({userId:userId});
    for(let j = 1; j <singleReport.length; j++){

        singleReport[0].quizGrade[j].quizId

    }



 res.status(200).json({ status: httpStatusText.SUCCESS, data: { report_Teacher } });



})



module.exports={
    reportStudent,
    singleReportforStudent
}

