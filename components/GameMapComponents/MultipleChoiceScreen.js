import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable, IconButton, Button } from 'native-base'
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
import { Ionicons } from '@expo/vector-icons'
import TowerSvg from './TowerSvg'

export default function MultipleChoiceScreen({
    question = multipleChoiceQuestionMock,
    AnswerMCQuestion = () => console.log("Default behavior"),
    playerQuestionAnswers,
    isDebugMode = false,
}) {
    const user = useRecoilValue(authAtom)
    const [answeredId, setAnsweredId] = useState()


    // Run debug timer to simulate actual countdown
    isDebugMode && useDebugTimer(6)

    // Use game sounds for timer
    const { sound, setSound } = useGameSoundEffect()

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


                {/* If debug mode, do not display overlay */}
                {!isDebugMode && !IsPlayerParticipating() ?
                    <Box height="100%" style={{ position: "absolute", zIndex: 150, elevation: 10, backgroundColor: "rgba(0, 0, 0, 0.3)", justifyContent: "center" }} width="100%" />
                    :
                    null
                }


                {/* Sound button */}
                {Platform.OS == "web" && <Center zIndex={50} right={0} position={"absolute"}>
                    <IconButton
                        onPress={() => {
                            setSound(!sound)
                        }}
                        size="md"
                        mt={2}
                        mr={2}
                        variant="outline"
                        _icon={{
                            as: Ionicons,
                            size: "2xl",
                            name: sound ? "volume-medium" : "volume-mute", // volume-medium // volume-mute
                            color: "white"
                        }}
                    />
                </Center>}

                <Center flex={1}>


                    <Box width="100%">

                        {/* Question / Avatars */}
                        <HStack >


                            {/* Attacker */}
                            {!isDebugMode && question.isNeutral ?
                                <PlayerAvatar supportIcon={"sword"} avatarName={question.participants.find(x => x.playerId == user.id).avatarName} />
                                :
                                <PlayerAvatar supportIcon={"sword"} avatarName={question.participants.find(x => x.playerId == question.attackerId).avatarName} />
                            }

                            {/* Question */}
                            <VStack flex={4} >

                                {/* Timer */}
                                <HStack mb={5} justifyContent={question.capitalRoundsRemaining ? "space-between" : "center"} >

                                    {/* 
                                        This copies the right sidebar and hides it,
                                        Centers timer perfectly
                                     */}

                                    {question.capitalRoundsRemaining && <HStack style={{
                                        opacity: 0
                                    }}>
                                        {Array(question.capitalRoundsRemaining).fill(0).map((_, i) => <TowerSvg key={`upper_${i}`} />)}
                                    </HStack>}


                                    <MCQuestionTimer key="gameTimer" />

                                    {question.capitalRoundsRemaining && <HStack>
                                        <Center>

                                            <Box p={1} backgroundColor={"cyan.800"} borderRadius={10}>
                                                <Text fontSize={{ sm: "md", md: "lg", lg: "xl" }} p={1} px={3} fontWeight="bold" color="#fff" >Capital</Text>
                                            </Box>
                                        </Center>
                                        {Array(question.capitalRoundsRemaining).fill(0).map((_, i) => <TowerSvg key={`under_${i}`} />)}
                                    </HStack>}
                                </HStack>

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