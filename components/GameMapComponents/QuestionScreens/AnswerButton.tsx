import { Box, Text, Pressable, View } from 'native-base'
import React from 'react'
import { Dimensions, Platform } from 'react-native'
import { useRecoilValue } from 'recoil'
import { authAtom, gameTimerAtom } from '../../../state'
import { GetAvatarColor } from '../CommonGameFunc'
import { LinearGradient } from 'expo-linear-gradient';
import { MCPlayerQuestionAnswers, QuestionClientResponse } from '../../../types/gameResponseTypes'
import { AnswerMCQuestion } from '../../../hooks/useSignalR'
interface AnswerButtonParams {
    isDisabled: boolean,
    answeredId: number,
    playerQuestionAnswers: MCPlayerQuestionAnswers,
    setAnsweredId: (value: number) => void,
    question: QuestionClientResponse,
    playerAnswers: { id: number, answerId: number }[]
    answer: {
        id: number;
        answer: string;
    }
}

export default function AnswerButton({ answer,
    playerAnswers,
    isDisabled,
    answeredId,
    playerQuestionAnswers,
    question,
    setAnsweredId
}: AnswerButtonParams) {

    const window = Dimensions.get('window')
    const user = useRecoilValue(authAtom)
    const gameTimer = useRecoilValue(gameTimerAtom)

    return (
        <Pressable onPress={() => {
            if (answeredId) return
            if (gameTimer <= 0) return
            setAnsweredId(answer.id)
            AnswerMCQuestion(answer.id.toString(), gameTimer)
        }}>
            {({ isHovered, isFocused, isPressed }) => {
                return (
                    <View mt={Platform.OS == "web" ? 6 : 2} >

                        {/* Disabled overlay */}
                        {isDisabled &&
                            <Box borderRadius={50} height="100%" width="100%" style={{ position: "absolute", zIndex: 150, backgroundColor: "rgba(0, 0, 0, 0.3)", justifyContent: "center" }} />
                        }




                        <LinearGradient
                            // Button Linear Gradient
                            colors={playerAnswers?.length == 3 ? ["#5074FF", "#8350FF", "#8350FF", "#FF5074"] :
                                playerAnswers?.length == 2 ? [GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName), GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[1].id).avatarName)] :
                                    playerAnswers?.length == 1 ? [GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName), GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName)] :
                                        answeredId == answer.id ? [GetAvatarColor(question.participants.find(x => x.playerId == user.id).avatarName), GetAvatarColor(question.participants.find(x => x.playerId == user.id).avatarName)] :
                                            isPressed ? ["#96BAD0", "#96BAD0"] :
                                                isHovered ? ["#A8CCE2", "#A8CCE2"] : ["#D4EDFD", "#D4EDFD"]
                            }

                            locations={playerAnswers?.length == 3 ? [0.33, 0.33, 0.66, 0.66] :
                                playerAnswers?.length == 2 ? [0.5, 0.5] :
                                    [0.5, 0.5]
                            }
                            start={{ x: 1, y: 1 }} style={{
                                padding: 10,
                                elevation: 5,
                                borderRadius: 50,
                                borderColor: playerQuestionAnswers?.correctAnswerId == answer.id ? "#42FF00" : "#000",
                                borderWidth: playerQuestionAnswers?.correctAnswerId == answer.id ? 10 : 1,
                            }}>
                            <Box px={8} minWidth={Platform.OS == "web" ? "35vw" : window.width * 0.2} maxWidth={Platform.OS == "web" ? "40vw" : window.width * 0.4} py={2}>
                                <Text style={{ flexWrap: 'wrap', color: playerAnswers?.length > 0 || answeredId == answer.id ? "white" : "black" }} fontStyle="italic" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "3xl" }}>
                                    {decodeURIComponent(answer.answer)}
                                </Text>

                            </Box>
                        </LinearGradient>

                    </View>
                )
            }}
        </Pressable>
    )
}
