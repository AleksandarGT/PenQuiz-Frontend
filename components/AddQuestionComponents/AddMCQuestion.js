import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon } from 'native-base'
import { StatusCode } from '../../hooks'
import DefaultAlert from '../Popups/DefaultAlert'
import { useRecoilValue } from 'recoil'
import { useFetchWrapper } from '../../helpers'
import { QUESTION_SERVICE_API_URL } from '../../injectable'
import { useIsFocused } from '@react-navigation/native'


function InputField({ answerPlaceholder, answer, onChangeText }) {
    return (
        <VStack width={Platform.OS == "web" ? "100%" : "70%"}>
            <Text ml={2} fontSize="lg">Enter {answer.correct ? "correct" : "wrong"} answer:</Text>

            <Input onChangeText={(e) => {
                onChangeText(e)
            }}
                maxLength={50}
                shadow={3}
                value={answer.answer}
                keyboardType="numeric"
                mb={2}
                variant="rounded"
                backgroundColor={answer.correct ? "#fff" : "#D7D7D7"}
                _hover={{ backgroundColor: "#E8E8E8" }}
                color="black"
                placeholderTextColor="#A4A4A4"
                size="md"
                placeholder={`eg: ${answerPlaceholder}`} />
        </VStack>
    )
}

export function AddMCQuestion({ backToBase }) {
    const fetchWrapper = useFetchWrapper()

    const [question, setQuestion] = useState({
        question: "",
        error: "",
    })
    const [answers, setAnswers] = useState([
        {
            answer: "",
            correct: true
        },
        {
            answer: "",
            correct: false
        },
        {
            answer: "",
            correct: false
        },
        {
            answer: "",
            correct: false
        },
    ])

    const [serverError, setServerError] = useState()

    function OnSubmit() {

        if (!question.question) {
            setQuestion(old => ({
                ...old, error: "Question field can not be empty!"
            }))
        }

        if (!answers.every(e => e.answer)) {
            setQuestion(old => ({
                ...old, error: "Some answer fields are empty!"
            }))

            return
        }

        if (!question.question) return;

        const baseUrl = `${QUESTION_SERVICE_API_URL}/api/question`
        fetchWrapper.post(`${baseUrl}/multiple`, {
            question: question.question,
            answer: answers[0].answer,
            wrongAnswers: answers.filter(e => !e.correct).map(e => e.answer)
        })
            .then(response => {
                setServerError("")
                backToBase(response.message)
            })
            .catch(er => {
                setServerError(er?.message)
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
            <Text mb={Platform.OS == "web" ? 9 : 0} textAlign="center" color="#fff" fontSize={{ base: 30, md: Platform.OS == "web" ? 40 : 30, lg: 50, xl: 60 }} style={{ fontFamily: 'Before-Collapse', }}>
                Add your closed question
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
                    color="black"
                    placeholderTextColor="#A4A4A4"
                    backgroundColor={"#fff"}
                    _hover={{ backgroundColor: "#E8E8E8" }}
                    size="md"
                    placeholder="eg: When was the first case of COVID19 found?" />
            </Box>
            <Box mt={Platform.OS == "web" ? 5 : 0} />
            <Box maxWidth="300px">
                <HStack justifyContent="center">
                    <InputField answerPlaceholder={2019} answer={answers[0]} onChangeText={(e) => {
                        setAnswers(old => old.map(
                            el => el == answers[0] ? { ...el, answer: e } : el
                        ))
                    }} />
                    <Box mx={1} />
                    <InputField answerPlaceholder={2020} answer={answers[1]} onChangeText={(e) => {
                        setAnswers(old => old.map(
                            el => el == answers[1] ? { ...el, answer: e } : el
                        ))
                    }} />
                </HStack>
                <HStack justifyContent="center">
                    <InputField answerPlaceholder={2018} answer={answers[2]} onChangeText={(e) => {
                        setAnswers(old => old.map(
                            el => el == answers[2] ? { ...el, answer: e } : el
                        ))
                    }} />
                    <Box mx={1} />
                    <InputField answerPlaceholder={2014} answer={answers[3]} onChangeText={(e) => {
                        setAnswers(old => old.map(
                            el => el == answers[3] ? { ...el, answer: e } : el
                        ))
                    }} />
                </HStack>
            </Box>
            <Box mt={Platform.OS == "web" ? 6 : 0} />
            {/* Submit */}
            <SubmitButton />

        </Center>
    )
}
