import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { gameInstanceMock, gameSvgs, GetAvatarColor, multipleChoicePvpQuestionMock, multipleChoiceQuestionMock, playerQuestionAnswersMock } from './CommonGameFunc';
import { authAtom, gameTimerAtom } from '../../state';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { PlayerAvatar, MultipleAvatars } from './QuestionScreens'
import MCQuestionTimer from './QuestionScreens/MCQuestionTimer';

export default function MultipleChoiceScreen({
    question = multipleChoiceQuestionMock,
    AnswerMCQuestion = () => console.log("Default behavior"),
    playerQuestionAnswers = playerQuestionAnswersMock
}) {
    const user = useRecoilValue(authAtom)
    const [answeredId, setAnsweredId] = useState()

    useEffect(() => {
        setAnsweredId(null)
    }, [question])

    function IsPlayerParticipating() {
        return question.participants.find(x => x.playerId == user.id) ? true : false
    }

    function AnswerButton({ answer, playerAnswers, isDisabled }) {
        return (
            <Pressable  onPress={() => {
                if (answeredId) return
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
                            background: playerAnswers?.length == 3 ? "linear-gradient(90deg, #5074FF 0%, #5074FF 33%, #8350FF 33%, #8350FF 66%, #FF5074 66%, #FF5074 100%)" :
                                playerAnswers?.length == 2 ? `linear-gradient(90deg, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName)} 0%, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName)} 50%, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[1].id).avatarName)} 50%, ${GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[1].id).avatarName)} 100%)` :
                                    playerAnswers?.length == 1 ? GetAvatarColor(question.participants.find(x => x.playerId == playerAnswers[0].id).avatarName) : null,

                            // Border for right answer
                            borderColor: "#42FF00",
                            borderWidth: playerQuestionAnswers?.correctAnswerId == answer.id ? 10 : 0,

                            // Outline for user selection

                            elevation: 5,

                        }} borderRadius={50}>
                            <Box px={8} minWidth="20vw" py={2}>
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



    return (
        <>
            <ImageBackground source={require('../../assets/gameLobby.svg')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                <Center flex={1}>
                    {!IsPlayerParticipating() ?
                        <Box height="80%" minHeight="500" style={{ position: "absolute", zIndex: 150, backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 25, justifyContent: "center" }} width="90%" />
                        :
                        null
                    }

                    <Box height="80%" minHeight="500" style={{ backgroundColor: "#D7FFFE", borderRadius: 25, justifyContent: "center" }} width="90%">
                        <Box >
                            <Center>
                                {/* Top Timer */}
                                <MCQuestionTimer />
                            </Center>

                            {/* Question / Avatars */}
                            <HStack style={{ margin: 10 }}>


                                {/* Attacker */}
                                {question.isNeutral ?
                                    <PlayerAvatar supportIcon={"sword"} avatarName={question.participants.find(x => x.playerId == user.id).avatarName} />
                                    :
                                    <PlayerAvatar supportIcon={"sword"} avatarName={question.participants.find(x => x.playerId == question.attackerId).avatarName} />
                                }

                                {/* Question */}
                                <VStack flex={4} >
                                    <Box style={{
                                        height: "100%",
                                        borderRadius: 30,
                                        backgroundColor: "#2F4887",
                                        justifyContent: "center"
                                    }} p={10} shadow="5">
                                        <Text fontWeight="bold" fontSize="4xl" style={{ textAlign: "center" }}>
                                            {decodeURIComponent(question.question)}
                                        </Text>
                                    </Box>
                                </VStack>

                                {/* Defender */}
                                {question.isNeutral ?
                                    <MultipleAvatars avatarNames={question.participants.filter(x => x.playerId != user.id).map(e => e.avatarName)} />
                                    :
                                    <PlayerAvatar supportIcon={"shield"} avatarName={question.participants.find(x => x.playerId == question.defenderId).avatarName} />
                                }
                            </HStack>

                            {/* Divider */}
                            <Center my={1}>
                                <Divider width="80%" height={1} bgColor="#25479D" />
                            </Center>
                        </Box>
                        <Box >
                            {/* Buttons */}
                            <Box>
                                <HStack justifyContent="space-evenly" >
                                    <VStack>
                                        <AnswerButton
                                            isDisabled={!IsPlayerParticipating()}
                                            answer={question.answers[0]}
                                            playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[0].id)}
                                        />
                                        <AnswerButton
                                            isDisabled={!IsPlayerParticipating()}
                                            answer={question.answers[1]}
                                            playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[1].id)}
                                        />
                                    </VStack>
                                    <VStack>
                                        <AnswerButton
                                            isDisabled={!IsPlayerParticipating()}
                                            answer={question.answers[2]}
                                            playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[2].id)}
                                        />
                                        <AnswerButton
                                            isDisabled={!IsPlayerParticipating()}
                                            answer={question.answers[3]}
                                            playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[3].id)}
                                        />
                                    </VStack>
                                </HStack>
                            </Box>
                        </Box>

                    </Box>
                </Center>
            </ImageBackground>
        </>
    )
}