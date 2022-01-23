import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon } from 'native-base'
import { StatusCode } from '../../hooks'
import DefaultAlert from '../Popups/DefaultAlert'
import { useRecoilValue } from 'recoil'
import { authAtom } from '../../state'
import { useFetchWrapper } from '../../helpers'
import { BACKEND_QUESTION_API_URL } from '@env'
import { useIsFocused } from '@react-navigation/native'

export function AddNumberQuestion({ backToBase }) {
    const fetchWrapper = useFetchWrapper()

    const [question, setQuestion] = useState({
        question: "",
        error: "",
    })
    const [answer, setAnswer] = useState({
        answer: "",
        error: "",
    })

    const [serverError, setServerError] = useState()

    function OnSubmit() {
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

        const baseUrl = `${BACKEND_QUESTION_API_URL}/api/question`
        fetchWrapper.post(`${baseUrl}/number`, {
            question: question.question,
            answer: answer.answer
        })
            .then(response => {
                setServerError("")
                backToBase(response.message)
            })
            .catch(er => {
                setServerError(er)
            })
    }

    function SubmitButton() {
        return (
            <Pressable onPress={() => {
                OnSubmit()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} shadow={3} bg={isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"} p={2} borderRadius={50}>
                            <Box px={4} pb={2} pt={2}>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }}>
                                    Submit question
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
            <Text mb={0} textAlign="center" color="#fff" fontSize={{ base: 30, md: 40, lg: 50, xl: 60 }} style={{ fontFamily: 'Before-Collapse', }}>
                Add your number{"\n"}question
            </Text>

            {serverError && <DefaultAlert message={serverError} />}

            {/* Question */}
            <Box width="50%" minWidth="250px" maxWidth="600px">
                {question.error && DefaultAlert({
                    message: question.error
                })}
                <Text ml={2} fontSize="lg">Enter question:</Text>

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
                    bg="#fff"
                    color="black"
                    _hover={{ bg: "#E8E8E8" }}
                    size="md"
                    placeholder="eg: When did World War 2 end?" />
            </Box>


            {/* Answer */}
            <Box width="50%" minWidth="250px" maxWidth="600px">
                {answer.error && DefaultAlert({
                    message: answer.error
                })}
                <Text ml={2} fontSize="lg">Enter answer:</Text>

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
                    bg="#fff"
                    color="black"
                    _hover={{ bg: "#E8E8E8" }}
                    size="md"
                    placeholder="eg: 1945" />
            </Box>
            <Box mt={6} />
            {/* Submit */}
            <SubmitButton />

        </Center>
    )
}
