import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Dimensions, ImageBackground, Platform, View } from 'react-native'
import { gameInstanceMock, gameSvgs, GetAvatarColor, multipleChoicePvpQuestionMock, multipleChoiceQuestionMock, playerQuestionAnswersMock, playerQuestionNumberAnswersMock } from './CommonGameFunc'
import { authAtom, gameTimerAtom } from '../../state'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { PlayerAvatar, MultipleAvatars } from './QuestionScreens'
import MCQuestionTimer from './QuestionScreens/MCQuestionTimer'
import AnswerButton from './QuestionScreens/AnswerButton'

export default function MultipleChoiceScreen({
    question = multipleChoiceQuestionMock,
    AnswerMCQuestion = () => console.log("Default behavior"),
    playerQuestionAnswers
}) {
    const user = useRecoilValue(authAtom)
    const [answeredId, setAnsweredId] = useState()

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
                        <Box height="80%" minHeight="550" style={{ position: "absolute", zIndex: 150, backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: 25, justifyContent: "center" }} width="90%" />
                        :
                        null
                    }

                    <Box height="80%" minHeight="550" style={{ backgroundColor: "#D7FFFE", borderRadius: 25, justifyContent: "center" }} width="90%">
                        <Box >
                            <Center>
                                {/* Top Timer */}
                                <MCQuestionTimer key="gameTimer" />
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
                                        height: Platform.OS == "web" ? "100%" : "0%",
                                        borderRadius: 30,
                                        backgroundColor: "#2F4887",
                                        justifyContent: "center"
                                    }} p={20} shadow="5">
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
                        </Box>

                    </Box>
                </Center>
            </ImageBackground>
        </>
    )
}