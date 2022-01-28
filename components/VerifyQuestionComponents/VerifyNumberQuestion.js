import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon, Spacer, Icon } from 'native-base'
import { StatusCode } from '../../hooks'
import DefaultAlert from '../Popups/DefaultAlert'
import { useRecoilValue } from 'recoil'
import { authAtom } from '../../state'
import { useFetchWrapper } from '../../helpers'
import { BACKEND_QUESTION_API_URL } from '@env'
import { MaterialIcons } from '@expo/vector-icons';

export function VerifyNumberQuestion({ backToBase, questionProp, answerProp, questionId }) {
    const fetchWrapper = useFetchWrapper()
    const [isEditable, setIsEditable] = useState(false)
    const [question, setQuestion] = useState({
        question: questionProp,
        error: "",
    })
    const [answer, setAnswer] = useState({
        answer: answerProp,
        error: "",
    })

    const [serverError, setServerError] = useState()

    function RejectQuestion() {
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

    function AcceptQuestion() {
        if (!question.question) {
            setQuestion(old => ({
                ...old, error: "Question field can not be empty!"
            }))
        }
        if (!answer.answer) {
            setAnswer(old => ({
                ...old, error: "Answer field can not be empty!"
            }))
        }

        if (!question.question || !answer.answer) return;

        if (isEditable) {
            const baseUrl = `${BACKEND_QUESTION_API_URL}/api/questionadmin/changed-verify`
            fetchWrapper.post(`${baseUrl}`, {
                questionId: questionId,
                question: question.question,
                answer: answer.answer,
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
            const baseUrl = `${BACKEND_QUESTION_API_URL}/api/questionadmin/verify`
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

    function TemplateButton({ onClick, accept, reject }) {
        return (
            <Pressable onPress={() => {
                onClick()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box borderColor="white" borderWidth={1} px={9} shadow={3} bg={accept && isPressed ? "green.700" : accept && isHovered ? "green.600" : accept ? "#00930F" : reject && isPressed ? "red.700" : reject && isHovered ? "red.600" : "#A01B1B"} borderRadius={50}>
                            <Box pb={2} pt={2}>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: "xl" }}>
                                    {accept && "Accept"}
                                    {reject && "Reject"}
                                </Text>
                            </Box>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }

    return (
        <Center>
            {serverError && <DefaultAlert message={serverError} />}

            {/* Question */}
            <Box width="50%" minWidth="250px" maxWidth="600px">
                {question.error && DefaultAlert({
                    message: question.error
                })}
                <Text ml={2} fontSize="lg">User question:</Text>

                <Input onChangeText={(e) => {
                    setQuestion({
                        question: e,
                        error: "",
                    })
                }}
                    shadow={3}
                    value={question.question}
                    mb={2}
                    variant="rounded"
                    bg={isEditable ? "#fff" : "#CDCDCD"}
                    editable={isEditable}
                    color="black"
                    _hover={{ bg: isEditable ? "#E8E8E8" : "#CDCDCD" }}
                    size="md"
                    InputRightElement={<Icon onPress={() => {
                        setIsEditable(!isEditable)
                    }} as={<MaterialIcons name="edit" />} size={5} mr="2" color="black" />}
                />
            </Box>


            {/* Answer */}
            <Box width="50%" minWidth="250px" maxWidth="600px">
                {answer.error && DefaultAlert({
                    message: answer.error
                })}
                <Text ml={2} fontSize="lg">User answer:</Text>

                <Input onChangeText={(e) => {
                    if (/^\d+$/.test(e) || !e) {
                        setAnswer({
                            answer: e,
                            error: ""
                        })
                    }
                }}
                    maxLength={12}
                    shadow={3}
                    value={answer.answer}
                    keyboardType="numeric"
                    mb={2}
                    variant="rounded"
                    bg={isEditable ? "#fff" : "#CDCDCD"}
                    editable={isEditable}
                    color="black"
                    _hover={{ bg: isEditable ? "#E8E8E8" : "#CDCDCD" }}
                    size="md" />
            </Box>
            <Box mt={6} />

            <HStack width="50%" minWidth="250px" maxWidth="600px" justifyContent="space-between">
                <TemplateButton reject onClick={() => {
                    RejectQuestion()
                }} />
                <TemplateButton accept onClick={() => {
                    AcceptQuestion()
                }} />
            </HStack>

        </Center>
    )
}
