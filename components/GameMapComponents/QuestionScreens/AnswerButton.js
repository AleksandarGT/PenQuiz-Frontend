import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable } from 'native-base'
import React from 'react'
import { Dimensions, Platform } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil'
import { authAtom, gameTimerAtom } from '../../../state'
import { GetAvatarColor } from '../CommonGameFunc'


export default function AnswerButton({ answer, playerAnswers, isDisabled, answeredId, playerQuestionAnswers, question, AnswerMCQuestion, setAnsweredId }) {
    const window = Dimensions.get('window')
    const user = useRecoilValue(authAtom)
    const gameTimer = useRecoilValue(gameTimerAtom)

    return (
        <Pressable onPress={() => {
            if (answeredId) return
            if (gameTimer <= 0) return
            setAnsweredId(answer.id)
            AnswerMCQuestion(answer.id)
        }}>
            {({ isHovered, isFocused, isPressed }) => {
                return (
                    <Box mt={6} shadow={3} bg={
                        answeredId == answer.id ? GetAvatarColor(question.participants.find(x => x.playerId == user.id).avatarName) :
                            isPressed ? "#06295A" :
                                isHovered ? "#06326F" : "#000000"
                    } p={2} style={{
                        background: Platform.OS == "web" && playerAnswers?.length == 3 ? "linear-gradient(90deg, #5074FF 0%, #5074FF 33%, #8350FF 33%, #8350FF 66%, #FF5074 66%, #FF5074 100%)" :
                            playerAnswers?.length == 2 ? `linear-gradient(90deg, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName)} 0%, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName)} 50%, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[1].id).avatarName)} 50%, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[1].id).avatarName)} 100%)` :
                                playerAnswers?.length == 1 ? GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName) : null,

                        // Border for right answer
                        borderColor: "#42FF00",
                        borderWidth: playerQuestionAnswers?.correctAnswerId == answer.id ? 10 : 0,

                        // Outline for user selection

                        elevation: 5,

                    }} borderRadius={50}>
                        <Box px={8} minWidth={Platform.OS == "web" ? "20vw" : window.width * 0.2} py={2}>
                            <Text style={{ textAlign: "center" }} fontSize={{ base: "md", md: "lg", lg: "xl", xl: "3xl" }}>
                                {decodeURIComponent(answer.answer)}
                            </Text>
                        </Box>
                    </Box>
                )
            }}
        </Pressable>
    )
}
