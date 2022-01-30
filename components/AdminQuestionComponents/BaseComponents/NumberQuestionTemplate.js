import React from 'react'
import { Text, Center, Box, Input, HStack, Icon } from 'native-base'
import DefaultAlert from '../../Popups/DefaultAlert'
import { MaterialIcons } from '@expo/vector-icons';
import { useQuestionVerification } from '../../../hooks/useQuestionVerification'
import TemplateButton from './ActionButton'

export function NumberQuestionTemplate({ backToBase, questionProp, answerProp, questionId }) {

    const { isEditable,
        setIsEditable,
        question,
        setQuestion,
        answer,
        setAnswer,
        serverError,
        RejectQuestion,
        AcceptQuestion } = useQuestionVerification(backToBase, questionProp, questionId, answerProp)

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
                    AcceptQuestion("number")
                }} />
            </HStack>

        </Center>
    )
}
