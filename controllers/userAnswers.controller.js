const userAnswers = require("../models/userAnswers.model");
const modelAnswer = require ("../models/modelAnswer.model");
const quizResult = require("../models/quizResult.model");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const sumbitUserAnswers = asyncWrapper( async(req,res,next) => {
    const quizId = req.params.id;
    const userId = req.currentUser.id;
    const { answers } = req.body;

    const check = await userAnswers.findOne({ userId:userId , quizId:quizId });
    if(check){
        const error = appError.create("You already have taken this quiz", 400, httpStatusText.FAIL)
        return next(error)
    }

    if(!answers){
        const error = appError.create("You must fill the answers", 400, httpStatusText.FAIL)
        return next(error)

    }

    const newUserAnswers = new userAnswers({
        userId: userId,
        quizId: quizId,
        answers: answers
    })
    await newUserAnswers.save();

    const correctAnswer = await modelAnswer.findOne({quizId: quizId});
    const numberOfQuestiosn = correctAnswer.answers.length;
    let score = 0;
    for (let j = 0; j < numberOfQuestiosn; j++) {
        if (correctAnswer.answers[j].answerText === answers[j]?.answerText) {
            score++;
        }
    }
    const grade = (score / numberOfQuestiosn) * 100;
    const newQuizResult = new quizResult (
        {
            userId : userId,
            quizId :quizId,
            quizGrade :[
                {
                    quizId : quizId,
                    grade : grade

                }
            ]
        }
    )

    await newQuizResult.save()
    
    res.status(200).json({ status: httpStatusText.SUCCESS, data: {Score: grade} });



})


module.exports ={
    sumbitUserAnswers,

} 