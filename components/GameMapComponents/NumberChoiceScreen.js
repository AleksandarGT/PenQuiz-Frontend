import { Box, Center, Container, HStack, Text, VStack, IconButton } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, Platform, View } from 'react-native'
import { gameInstanceMock, gameSvgs, GetAvatarColor, multipleChoiceQuestionMock, numberChoicePvpQuestionMock, numberChoiceQuestionMock, playerQuestionAnswersMock, playerQuestionNumberAnswersMock } from './CommonGameFunc'
import { authAtom, gameTimerAtom } from '../../state'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { PlayerAvatar, MultipleAvatars, AnswerButton } from './QuestionScreens'
import MCQuestionTimer from './QuestionScreens/MCQuestionTimer'
import { MaterialIcons } from '@expo/vector-icons'
import AnswerNumberQuestionComponent from './QuestionScreens/AnswerNumberQuestionComponent'
import useGameSoundEffect from '../../hooks/useGameSoundEffect'
import useDebugTimer from '../../hooks/useDebugTimer'
import { Ionicons } from '@expo/vector-icons'
import TowerSvg from './TowerSvg'

export default function NumberChoiceScreen({
    question = numberChoicePvpQuestionMock,
    AnswerNumberQuestion = (e) => console.log("Default behavior" + e),
    playerQuestionAnswers,
    isDebugMode = false
}) {

    // Run debug timer to simulate actual countdown
    isDebugMode && useDebugTimer(12)

    // Use game sounds for timer
    const { sound, setSound } = useGameSoundEffect()



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
                        }} key={x.playerId} width="25%" p={1} borderRadius={25} bg={GetAvatarColor(question.participants.find(y => y.playerId == x.playerId).avatarName)}>
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