import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable, View } from 'native-base'
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
            AnswerMCQuestion(answer.id, gameTimer)
        }}>
            {({ isHovered, isFocused, isPressed }) => {
                return (
                    <Box mt={Platform.OS == "web" ? 6 : 2} shadow={3} bg={
                        answeredId == answer.id ? GetAvatarColor(question.participants.find(x => x.playerId == user.id).avatarName) :
                            isPressed ? "#96BAD0" :
                                isHovered ? "#A8CCE2" : "#D4EDFD"
                    } p={2} style={{
                        background: Platform.OS == "web" && playerAnswers?.length == 3 ? "linear-gradient(90deg, #5074FF 0%, #5074FF 33%, #8350FF 33%, #8350FF 66%, #FF5074 66%, #FF5074 100%)" :
                            playerAnswers?.length == 2 ? `linear-gradient(90deg, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName)} 0%, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName)} 50%, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[1].id).avatarName)} 50%, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[1].id).avatarName)} 100%)` :
                                playerAnswers?.length == 1 ? GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName) : null,

                        //#42FF00
                        // Border for right answer
                        borderColor: playerQuestionAnswers?.correctAnswerId == answer.id ? "#42FF00" : "#000",
                        borderWidth: playerQuestionAnswers?.correctAnswerId == answer.id ? 10 : 1,

                        // Outline for user selection

                        elevation: 5,
                    }} borderRadius={50}>
                        <Box px={8} minWidth={Platform.OS == "web" ? "35vw" : window.width * 0.2} maxWidth={Platform.OS == "web" ? "40vw" : window.width * 0.4} py={2}>
                            <Text style={{ flexWrap: 'wrap', color: playerAnswers?.length > 0 || answeredId == answer.id ? "white" : "black" }} fontStyle="italic" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "3xl" }}>
                                {decodeURIComponent(answer.answer)}
                            </Text>

                        </Box>
                    </Box>
                )
            }}
        </Pressable>
    )
}
