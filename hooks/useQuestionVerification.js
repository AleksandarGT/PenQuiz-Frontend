import { useState } from "react"
import { useFetchWrapper } from "../helpers"
import { BACKEND_QUESTION_API_URL } from '@env'

export function useQuestionVerification(backToBase, questionProp, questionId, answerProp, answersProp = []) {
    const fetchWrapper = useFetchWrapper()

    const [isEditable, setIsEditable] = useState(false)
    const [question, setQuestion] = useState({
        question: questionProp,
        error: "",
    })

    // Number questions
    const [answer, setAnswer] = useState(answerProp && {
        answer: answerProp,
        error: "",
    })

    // Multiple Choice questions
    const [answers, setAnswers] = useState(answersProp.length == 4 && [
        {
            answer: answersProp.find(x => x.correct).answer,
            correct: true
        },
        {
            answer: answersProp.filter(e => !e.correct)[0].answer,
            correct: false
        },
        {
            answer: answersProp.filter(e => !e.correct)[1].answer,
            correct: false
        },
        {
            answer: answersProp.filter(e => !e.correct)[2].answer,
            correct: false
        },
    ])

    const [serverError, setServerError] = useState()

    function RejectQuestion() {
        console.log(questionId)
        const baseUrl = `${BACKEND_QUESTION_API_URL}/api/questionadmin/reject`
        fetchWrapper.post(`${baseUrl}`, {
            questionId: questionId
        })
            .then(response => {
                setServerError("")
                console.log(response)
                backToBase({ message: response.message, status: "danger" })
            })
            .catch(er => {
                setServerError(er)
            })
    }

    function ValidateQuestion(type) {
        if (type != "multiple" && type != "number")
            throw ""

        if (!question.question) {
            setQuestion(old => ({
                ...old, error: "Question field can not be empty!"
            }))
        }

        if (type == "number") {
            if (!answer.answer) {
                setAnswer(old => ({
                    ...old, error: "Answer field can not be empty!"
                }))
            }

            if (!question.question || !answer.answer) throw "";

        }
        else {
            if (!answers.every(e => e.answer)) {
                setQuestion(old => ({
                    ...old, error: "Some answer fields are empty!"
                }))

                throw ""
            }

            if (!question.question) throw "";
        }
    }

    function SendAcceptedRequest(endpoint, type) {
        if (endpoint != "accept" && endpoint != "edit") throw "You can only provide 'edit' or 'accept'"

        if (isEditable) {
            const baseUrl = `${BACKEND_QUESTION_API_URL}/api/questionadmin/${endpoint == "accept" ? "changed-verify" : "edit"}`
            fetchWrapper.post(`${baseUrl}`, {
                questionId: questionId,
                question: question.question,

                answer: type == "multiple" ? answers[0].answer : answer.answer,
                wrongAnswers: type == "multiple" ? answers.filter(e => !e.correct).map(e => e.answer) : null
            })
                .then(response => {
                    setServerError("")
                    backToBase({ message: response.message, status: "success" })
                })
                .catch(er => {
                    setServerError(er)
                })
        }
        else {
            const baseUrl = `${BACKEND_QUESTION_API_URL}/api/questionadmin/${endpoint == "accept" ? "verify" : "edit"}`
            fetchWrapper.post(`${baseUrl}`, {
                questionId: questionId
            })
                .then(response => {
                    setServerError("")
                    backToBase({ message: response.message, status: "success" })
                })
                .catch(er => {
                    setServerError(er)
                })
        }
    }

    function AcceptQuestion(type) {

        try {
            ValidateQuestion(type)
        }
        catch (ex) {
            // Validation failed, message was already recorded in state.
            return
        }

        SendAcceptedRequest("accept", type)
    }

    function EditQuestion() {
        try {
            ValidateQuestion(type)
        }
        catch (ex) {
            // Validation failed, message was already recorded in state.
            return
        }

        SendAcceptedRequest("edit", type)
    }

    return {
        isEditable,
        setIsEditable,
        question,
        setQuestion,

        // Number
        answer,
        setAnswer,
        //


        // Multiple
        answers,
        setAnswers,
        //

        serverError,
        RejectQuestion,
        AcceptQuestion
    }
}