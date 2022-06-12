import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable, IconButton, Button } from 'native-base'
import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions, ImageBackground, Platform, View } from 'react-native'
import { gameInstanceMock, gameSvgs, multipleChoicePvpQuestionMock, multipleChoiceQuestionMock, playerQuestionAnswersMock, playerQuestionNumberAnswersMock } from './CommonGameFunc'
import { authAtom, gameTimerAtom } from '../../state'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { PlayerAvatar, MultipleAvatars } from './QuestionScreens'
import MCQuestionTimer from './QuestionScreens/MCQuestionTimer'
import AnswerButton from './QuestionScreens/AnswerButton'
import useGameSoundEffect from '../../hooks/useGameSoundEffect'
import useDebugTimer from '../../hooks/useDebugTimer'
import { Ionicons } from '@expo/vector-icons'
import { TowerSvg } from './TimerSuffixElements'
import { MCPlayerQuestionAnswers, QuestionClientResponse } from '../../types/gameResponseTypes'
import { IAuthData } from '../../types/authTypes'
import { CharacterType, WizardCharacterAbilitiesResponse } from '../../types/gameCharacterTypes'
import { WizardUseMultipleChoiceHint } from '../../hooks'


function WizardActionComponent({ question, invisible }
    : { question: QuestionClientResponse, invisible?: boolean }) {

    const [showWizardButton, setShowWizardButton] = useState<boolean>(false);
    const globalDisplayTime = useRecoilValue(gameTimerAtom)
    const user = useRecoilValue(authAtom) as IAuthData

    const getThisUserWizardAbilities = useMemo(() => {
        return question.participants.find(e => e.playerId == user.id)?.gameCharacter?.characterAbilities.wizardCharacterAbilitiesResponse
    }, [question, user])

    const areAllHintsUsed = useMemo(() => {
        if (!getThisUserWizardAbilities) return true;

        return getThisUserWizardAbilities?.mcQuestionHintUseCount >= getThisUserWizardAbilities?.mcQuestionHintMaxUseCount
    }, [getThisUserWizardAbilities])


    useEffect(() => {
        const thisUserParticipant = question.participants.find(e => e.playerId == user.id)

        if (thisUserParticipant?.gameCharacter?.characterAbilities.characterType != CharacterType.WIZARD) return

        setShowWizardButton(true)
    }, [question, user])


    if (!showWizardButton)
        return null


    return (
        <Pressable opacity={invisible ? 0 : 100} disabled={invisible || areAllHintsUsed} onPress={() => WizardUseMultipleChoiceHint(globalDisplayTime)}>
            {({ isHovered, isFocused, isPressed }) => {
                return (
                    <Box style={{
                        aspectRatio: 1 / 1,
                    }} p={2} mt={6} shadow={3} bg={
                        isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"
                    } borderRadius={10}>
                        <Center>
                            <Text selectable={false} >
                                Wizard
                            </Text>
                            <Text selectable={false}>
                                {getThisUserWizardAbilities?.mcQuestionHintUseCount} / {getThisUserWizardAbilities?.mcQuestionHintMaxUseCount}
                            </Text>
                        </Center>
                    </Box>
                )
            }}
        </Pressable>
    )
}

export default function MultipleChoiceScreen({
    question,
    playerQuestionAnswers,
    isDebugMode = false,
}: { question: QuestionClientResponse, playerQuestionAnswers: MCPlayerQuestionAnswers, isDebugMode?: boolean }) {

    const user = useRecoilValue(authAtom) as IAuthData
    const [answeredId, setAnsweredId] = useState<number>()



    // Run debug timer to simulate actual countdown
    isDebugMode && useDebugTimer(6)

    // Use game sounds for timer
    const { sound, setSound } = useGameSoundEffect()

    useEffect(() => {
        setAnsweredId(undefined)
    }, [question])

    useEffect(() => {
        if (!playerQuestionAnswers) return

        const thisPlayerAnswer = playerQuestionAnswers.playerAnswers.find(e => e.id == user.id)?.answerId
        setAnsweredId(thisPlayerAnswer)
    }, [playerQuestionAnswers])

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
                                <PlayerAvatar supportIcon={"sword"} participant={question.participants.find(e => e.playerId == user.id)!} />
                                :
                                <PlayerAvatar supportIcon={"sword"} participant={question.participants.find(e => e.playerId == question.attackerId)!} />
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
                                <MultipleAvatars participants={question.participants.filter(e => e.playerId != user.id)} />
                                :
                                <PlayerAvatar supportIcon={"shield"} participant={question.participants.find(e => e.playerId == question.defenderId)!} />
                            }
                        </HStack>
                        {/* Buttons */}
                        <HStack justifyContent="space-evenly" >
                            <WizardActionComponent question={question} />
                            <VStack >
                                <AnswerButton
                                    setAnsweredId={setAnsweredId}
                                    answeredId={answeredId as number}
                                    playerQuestionAnswers={playerQuestionAnswers}
                                    question={question}
                                    key="answerButton1"
                                    isDisabled={!IsPlayerParticipating()}
                                    answer={question.answers[0]}
                                    playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[0].id)}
                                />
                                <AnswerButton
                                    setAnsweredId={setAnsweredId}
                                    answeredId={answeredId as number}
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
                                    answeredId={answeredId as number}
                                    playerQuestionAnswers={playerQuestionAnswers}
                                    question={question}
                                    key="answerButton3"
                                    isDisabled={!IsPlayerParticipating()}
                                    answer={question.answers[2]}
                                    playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[2].id)}
                                />
                                <AnswerButton
                                    setAnsweredId={setAnsweredId}
                                    answeredId={answeredId as number}
                                    playerQuestionAnswers={playerQuestionAnswers}
                                    question={question}
                                    key="answerButton4"
                                    isDisabled={!IsPlayerParticipating()}
                                    answer={question.answers[3]}
                                    playerAnswers={playerQuestionAnswers?.playerAnswers?.filter(x => x.answerId == question.answers[3].id)}
                                />
                            </VStack>
                            <WizardActionComponent question={question} invisible={true} />
                        </HStack>
                    </Box>
                </Center>
            </ImageBackground>
        </>
    )
}