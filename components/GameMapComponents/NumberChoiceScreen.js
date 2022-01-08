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
    question = numberChoiceQuestionMock,
    AnswerNumberQuestion = (e) => console.log("Default behavior" + e),
    playerQuestionAnswers
}) {
    const user = useRecoilValue(authAtom)

    function IsPlayerParticipating() {
        return question.participants.find(x => x.playerId == user.id) ? true : false
    }



    function NumberQuestionResult() {
        return (
            <Box>
                <HStack justifyContent="center">
                    <Box width="33%" paddingY={6} borderRadius={25} bg="#2F4887">
                        <Center alignItems="center" justifyContent="center">
                            <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 32 }}>{playerQuestionAnswers.correctAnswer}</Text>
                        </Center>
                    </Box>
                </HStack>

                <HStack marginTop={5} justifyContent="space-evenly">
                    {playerQuestionAnswers.playerAnswers.map(x =>
                        <Box style={{
                            elevation: 5,
                            // Border for right answer
                            borderColor: "#42FF00",
                            borderWidth: x.winner ? 10 : 0,
                        }} width="25%" paddingY={2} borderRadius={25} bg={GetAvatarColor(question.participants.find(y => y.playerId == x.playerId).avatarName)}>
                            <Center alignItems="center" justifyContent="center">
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 25 }}>{x.answer ?? "---"}</Text>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 20 }}>{x.timeElapsed ?? "---"}</Text>
                            </Center>
                        </Box>
                    )}

                </HStack>
            </Box>
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
                        <Box>
                            {playerQuestionAnswers ?
                                <NumberQuestionResult key="numQResult" />
                                :
                                <AnswerNumberQuestionComponent AnswerNumberQuestion={AnswerNumberQuestion} question={question} key="answerNQComp" />
                            }
                        </Box>
                    </Box>
                </Center>
            </ImageBackground>
        </>
    )
}