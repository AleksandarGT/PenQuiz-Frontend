import { useState } from "react"
import { QuestionsTemplateMode } from "../components/AdminQuestionComponents/BaseComponents/TableQuestionsTemplate"
import { useFetchWrapper } from "../helpers"
import { QUESTION_SERVICE_API_URL } from '../injectable'
import { Answers, Questions } from "../types/adminQuestionTypes"

export interface useQuestionVerificationParams {
    backToBase: ({ message, status }: { message: string, status: string }) => void,
    questionProp: string,
    questionId: number,
    answerProp?: string,
    answersProp?: Answers[]
    mode: QuestionsTemplateMode,
}

export enum QuestionType {
    MULTIPLE,
    NUMBER
}

export function useQuestionVerification({ backToBase, questionProp, questionId, answerProp, answersProp }: useQuestionVerificationParams) {
    const fetchWrapper = useFetchWrapper()
    const [isEditable, setIsEditable] = useState(false)
    const [question, setQuestion] = useState({
        question: questionProp,
        error: "",
    })
    const [serverError, setServerError] = useState<string>()

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


    function RejectQuestion() {

        const baseUrl = `${QUESTION_SERVICE_API_URL}/api/questionadmin/reject`
        fetchWrapper.post(`${baseUrl}`, {
            questionId: questionId
        })
            .then((response: { message: string }) => {
                setServerError("")
                backToBase({ message: response.message, status: "danger" })
            })
            .catch(er => {
                setServerError(er?.message)
            })
    }



    function ValidateQuestion(type: QuestionType) {

        if (!question.question) {
            setQuestion(old => ({
                ...old, error: "Question field can not be empty!"
            }))
        }

        if (type == QuestionType.NUMBER) {
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

    enum EndpointType {
        ACCEPT,
        EDIT
    }

    function SendAcceptedRequest(endpoint: EndpointType, type: QuestionType) {

        if (isEditable) {
            const baseUrl = `${QUESTION_SERVICE_API_URL}/api/questionadmin/${endpoint == EndpointType.ACCEPT ? "changed-verify" : "edit"}`

            fetchWrapper.post(`${baseUrl}`, {
                questionId: questionId,
                question: question.question,

                answer: type == QuestionType.MULTIPLE ? answers[0].answer : answer.answer,
                wrongAnswers: type == QuestionType.MULTIPLE ? answers.filter(e => !e.correct).map(e => e.answer) : null
            })
                .then((response: { message: string }) => {
                    setServerError("")
                    backToBase({ message: response.message, status: "success" })
                })
                .catch(er => {
                    setServerError(er?.message)
                })
        }
        else {
            const baseUrl = `${QUESTION_SERVICE_API_URL}/api/questionadmin/${endpoint == EndpointType.ACCEPT ? "verify" : "edit"}`
            fetchWrapper.post(`${baseUrl}`, {
                questionId: questionId
            })
                .then((response: { message: string }) => {
                    setServerError("")
                    backToBase({ message: response.message, status: "success" })
                })
                .catch(er => {
                    setServerError(er?.message)
                })
        }
    }

    function AcceptQuestion(type: QuestionType) {
        try {
            ValidateQuestion(type)
        }
        catch (ex) {
            // Validation failed, message was already recorded in state.
            return
        }

        SendAcceptedRequest(EndpointType.ACCEPT, type)
    }

    function EditQuestion(type: QuestionType) {

        try {
            ValidateQuestion(type)
        }
        catch (ex) {
            // Validation failed, message was already recorded in state.
            return
        }

        SendAcceptedRequest(EndpointType.EDIT, type)
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
        AcceptQuestion,
        EditQuestion
    }
}