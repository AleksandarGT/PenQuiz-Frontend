import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Dimensions, ImageBackground, Platform, View } from 'react-native'
import { gameInstanceMock, gameSvgs, GetAvatarColor, multipleChoicePvpQuestionMock, multipleChoiceQuestionMock, playerQuestionAnswersMock, playerQuestionNumberAnswersMock } from './CommonGameFunc'
import { authAtom, gameTimerAtom } from '../../state'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { PlayerAvatar, MultipleAvatars } from './QuestionScreens'
import MCQuestionTimer from './QuestionScreens/MCQuestionTimer'
import AnswerButton from './QuestionScreens/AnswerButton'
import useGameSoundEffect from '../../hooks/useGameSoundEffect'
import useDebugTimer from '../../hooks/useDebugTimer'

export default function MultipleChoiceScreen({
    question = multipleChoiceQuestionMock,
    AnswerMCQuestion = () => console.log("Default behavior"),
    playerQuestionAnswers,
    isDebugMode = false
}) {
    const user = useRecoilValue(authAtom)
    const [answeredId, setAnsweredId] = useState()


    // Run debug timer to simulate actual countdown
    isDebugMode && useDebugTimer(6)

    // Use game sounds for timer
    useGameSoundEffect()

    useEffect(() => {
        setAnsweredId(null)
    }, [question])

    function IsPlayerParticipating() {
        return question.participants.find(x => x.playerId == user.id) ? true : false
    }


    return (
        <>
            <ImageBackground source={Platform.OS === 'web' ? require('../../assets/gameLobby.svg') : require('../../assets/gameLobby.png')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                <Center flex={1}>
                    {!IsPlayerParticipating() ?
                        <Box height="100%" style={{ position: "absolute", zIndex: 150, elevation: 10, backgroundColor: "rgba(0, 0, 0, 0.3)", justifyContent: "center" }} width="100%" />
                        :
                        null
                    }

                    <Box style={{ justifyContent: "center" }} width="100%">

                        {/* Question / Avatars */}
                        <HStack >


                            {/* Attacker */}
                            {question.isNeutral ?
                                <PlayerAvatar supportIcon={"sword"} avatarName={question.participants.find(x => x.playerId == user.id).avatarName} />
                                :
                                <PlayerAvatar supportIcon={"sword"} avatarName={question.participants.find(x => x.playerId == question.attackerId).avatarName} />
                            }

                            {/* Question */}
                            <VStack flex={4} justifyContent="center">
                                <Center mb={5}>
                                    <MCQuestionTimer key="gameTimer" />
                                </Center>

                                <Box style={{
                                    borderRadius: 30,
                                    backgroundColor: "#D4EDFD",
                                    justifyContent: "center",
                                    borderWidth: 1,
                                }} p={Platform.OS == "web" ? 20 : 10} shadow="5">
                                    <Text fontWeight="bold" color="black" fontSize={Platform.OS == "web" ? "4xl" : "2xl"} style={{ textAlign: "center" }}>
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
                        {/* Buttons */}
                        <HStack justifyContent="space-evenly" >
                            <VStack >
                                <AnswerButton
                                    setAnsweredId={setAnsweredId}
                                    AnswerMCQuestion={AnswerMCQuestion}
                                    answeredId={answeredId}
                                    playerQuestionAnswers={playerQuestionAnswers}
                                    question={question}
                                    key="answerButton1"
                                    isDisabled={!IsPlayerParticipating()}
                                    answer={question.answers[0]}
                                    playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[0].id)}
                                />
                                <AnswerButton
                                    setAnsweredId={setAnsweredId}
                                    AnswerMCQuestion={AnswerMCQuestion}
                                    answeredId={answeredId}
                                    playerQuestionAnswers={playerQuestionAnswers}
                                    question={question}
                                    key="answerButton2"
                                    isDisabled={!IsPlayerParticipating()}
                                    answer={question.answers[1]}
                                    playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[1].id)}
                                />
                            </VStack>
                            <VStack>
                                <AnswerButton
                                    setAnsweredId={setAnsweredId}
                                    AnswerMCQuestion={AnswerMCQuestion}
                                    answeredId={answeredId}
                                    playerQuestionAnswers={playerQuestionAnswers}
                                    question={question}
                                    key="answerButton3"
                                    isDisabled={!IsPlayerParticipating()}
                                    answer={question.answers[2]}
                                    playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[2].id)}
                                />
                                <AnswerButton
                                    setAnsweredId={setAnsweredId}
                                    AnswerMCQuestion={AnswerMCQuestion}
                                    answeredId={answeredId}
                                    playerQuestionAnswers={playerQuestionAnswers}
                                    question={question}
                                    key="answerButton4"
                                    isDisabled={!IsPlayerParticipating()}
                                    answer={question.answers[3]}
                                    playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[3].id)}
                                />
                            </VStack>
                        </HStack>
                    </Box>
                </Center>
            </ImageBackground>
        </>
    )
}