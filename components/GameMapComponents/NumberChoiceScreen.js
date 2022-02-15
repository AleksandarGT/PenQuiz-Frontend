import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable, Input, Button, IconButton } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, Platform, View } from 'react-native'
import { gameInstanceMock, gameSvgs, GetAvatarColor, multipleChoiceQuestionMock, numberChoicePvpQuestionMock, numberChoiceQuestionMock, playerQuestionAnswersMock, playerQuestionNumberAnswersMock } from './CommonGameFunc'
import { authAtom, gameTimerAtom } from '../../state'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { PlayerAvatar, MultipleAvatars, AnswerButton } from './QuestionScreens'
import MCQuestionTimer from './QuestionScreens/MCQuestionTimer'
import { MaterialIcons } from '@expo/vector-icons'
import AnswerNumberQuestionComponent from './QuestionScreens/AnswerNumberQuestionComponent'

export default function NumberChoiceScreen({
    question = numberChoicePvpQuestionMock,
    AnswerNumberQuestion = (e) => console.log("Default behavior" + e),
    playerQuestionAnswers
}) {

    const user = useRecoilValue(authAtom)

    function IsPlayerParticipating() {
        return question.participants.find(x => x.playerId == user.id) ? true : false
    }

    function NumberQuestionResult() {
        return (
            <Box width="100%">
                <HStack justifyContent="center">
                    <Box width="33%" paddingY={Platform.OS == "web" ? 6 : 2} borderRadius={25} bg="#2F4887">
                        <Center alignItems="center" justifyContent="center">
                            <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 32 }}>{playerQuestionAnswers.correctAnswer}</Text>
                        </Center>
                    </Box>
                </HStack>

                <HStack marginTop={3} justifyContent="space-evenly">
                    {playerQuestionAnswers.playerAnswers.map(x =>
                        <Box style={{
                            // Border for right answer
                            borderColor: x.winner ? "#42FF00" : "transparent",
                            borderWidth: 10,
                        }} width="25%" p={1} borderRadius={25} bg={GetAvatarColor(question.participants.find(y => y.playerId == x.playerId).avatarName)}>
                            <Center>
                                <Text style={{ textAlign: "center" }} fontSize={{ base: "md", md: "lg", lg: "xl", xl: 25 }}>{x.answer ?? "---"}</Text>
                                <Text style={{ textAlign: "center" }} fontSize={{ base: "md", md: "lg", lg: "xl", xl: 20 }}>{x.timeElapsed ?? "---"}</Text>
                            </Center>
                        </Box>
                    )}

                </HStack>
            </Box>
        )
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
                            <VStack justifyContent="center" flex={4} >
                                <Center mb={5}>
                                    {/* Top Timer */}
                                    <MCQuestionTimer key="gameTimer" />
                                </Center>

                                <Box style={{
                                    borderRadius: 30,
                                    backgroundColor: "#D4EDFD",
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
                    </Box>
                    {playerQuestionAnswers ?
                        <NumberQuestionResult key="numQResult" />
                        :
                        <AnswerNumberQuestionComponent AnswerNumberQuestion={AnswerNumberQuestion} question={question} key="answerNQComp" />
                    }
                </Center>
            </ImageBackground>
        </>
    )
}