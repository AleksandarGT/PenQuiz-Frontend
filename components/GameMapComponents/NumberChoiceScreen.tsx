import { Box, Center, HStack, Text, VStack, IconButton } from 'native-base'
import React, { } from 'react'
import { ImageBackground, Platform } from 'react-native'
import { GetAvatarColor } from './CommonGameFunc'
import { authAtom } from '../../state'
import { useRecoilValue } from 'recoil'
import { PlayerAvatar, MultipleAvatars } from './QuestionScreens'
import MCQuestionTimer from './QuestionScreens/MCQuestionTimer'
import AnswerNumberQuestionComponent from './QuestionScreens/AnswerNumberQuestionComponent'
import useGameSoundEffect from '../../hooks/useGameSoundEffect'
import useDebugTimer from '../../hooks/useDebugTimer'
import { Ionicons } from '@expo/vector-icons'
import { CapitalRoundTimer, LastRoundIndicator } from './TimerSuffixElements'
import { NumberPlayerQuestionAnswers, QuestionClientResponse } from '../../types/gameResponseTypes'
import { IAuthData } from '../../types/authTypes'
import CharacterQuestionActionComponent from './CharacterComponents/CharacterQuestionActionComponent'

export default function NumberChoiceScreen({
    question,
    playerQuestionAnswers,
    isDebugMode = false,
}: { question: QuestionClientResponse, playerQuestionAnswers: NumberPlayerQuestionAnswers, isDebugMode?: boolean }) {

    // Run debug timer to simulate actual countdown
    isDebugMode && useDebugTimer(12)

    // Use game sounds for timer
    const { sound, setSound } = useGameSoundEffect()

    const user = useRecoilValue(authAtom) as IAuthData

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
                        }} key={x.playerId} width="25%" p={1} borderRadius={25} bg={GetAvatarColor(question.participants.find(y => y.playerId == x.playerId)!.inGameParticipantNumber)}>
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
                            {question.isNeutral ?
                                <PlayerAvatar supportIcon={"sword"} participant={question.participants.find(e => e.playerId == user.id)!} />
                                :
                                <PlayerAvatar supportIcon={"sword"} participant={question.participants.find(e => e.playerId == question.attackerId)!} />
                            }

                            {/* Question */}
                            <VStack justifyContent="center" flex={4} >


                                {/* Timer */}
                                {question.capitalRoundsRemaining ?

                                    <CapitalRoundTimer question={question} /> :

                                    question.isLastQuestion ?

                                        <LastRoundIndicator /> :


                                        <HStack mb={5} justifyContent={"center"} >
                                            <MCQuestionTimer key="gameTimer" />
                                        </HStack>
                                }


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
                                <MultipleAvatars participants={question.participants.filter(e => e.playerId != user.id)} />
                                :
                                <PlayerAvatar supportIcon={"shield"} participant={question.participants.find(e => e.playerId == question.defenderId)!} />
                            }

                        </HStack>

                    {playerQuestionAnswers ?
                        <NumberQuestionResult key="numQResult" />
                        :
                        <AnswerNumberQuestionComponent question={question} key="answerNQComp" />
                    }
                    </Box>

                </Center>
            </ImageBackground>
        </>
    )
}