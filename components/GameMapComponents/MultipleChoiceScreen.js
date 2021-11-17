import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { gameInstanceMock, gameSvgs, GetAvatarColor, multipleChoiceQuestionMock } from './CommonGameFunc';
import { authAtom, gameTimerAtom } from '../../state';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function MultipleChoiceScreen({ question = multipleChoiceQuestionMock }) {
    const user = useRecoilValue(authAtom)


    function PlayerAvatar({ supportIcon, avatarName }) {
        return (
            <VStack flex={1}>
                <Center>
                    <Box style={{ backgroundColor: GetAvatarColor(avatarName), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={gameSvgs.find(x => x.name == avatarName).img}
                                        alt="Alternate Text"
                                        resizeMode="contain"
                                        size="lg"
                                    />
                                </Center>
                            </VStack>
                        </Box>
                    </Box>

                    <Center style={{ borderColor: "black", borderWidth: 2, borderRadius: 15 }} mt={3} p={2}>
                        <Image
                            source={gameSvgs.find(x => x.name == supportIcon).img}
                            alt="Alternate Text"
                            resizeMode="contain"
                            size="sm"
                        />
                    </Center>
                </Center>

            </VStack>
        )
    }

    function MultipleDefenders({ avatarNames }) {
        return (
            <VStack flex={1}>
                <Center>
                    <Box style={{ backgroundColor: GetAvatarColor(avatarNames[0]), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={gameSvgs.find(x => x.name == avatarNames[0]).img}
                                        alt="Alternate Text"
                                        resizeMode="contain"
                                        size="md"
                                    />
                                </Center>
                            </VStack>
                        </Box>
                    </Box>

                    <Box mt={2} style={{ backgroundColor: GetAvatarColor(avatarNames[1]), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={gameSvgs.find(x => x.name == avatarNames[1]).img}
                                        alt="Alternate Text"
                                        resizeMode="contain"
                                        size="md"
                                    />
                                </Center>
                            </VStack>
                        </Box>
                    </Box>
                </Center>

            </VStack>
        )
    }

    function CustomButton({ answer }) {
        return (
            <Pressable onPress={() => {
                console.log(`Response ID ${answer.id}`)
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box mt={6} shadow={3} bg={
                            isPressed ? "#06295A" : isHovered ? "#06326F" : "#25479D"
                        } p={2} borderRadius={50}>
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

    function MCQuestionTimer() {
        const [displayTime, setDisplayTime] = useRecoilState(gameTimerAtom)

        useEffect(() => {
            // Update the display time value
            const updatingTimeInterval = setInterval(() => {
                setDisplayTime((prevValue) => {
                    if (prevValue <= 1) {
                        clearInterval(updatingTimeInterval)
                        return 0;
                    }
                    return prevValue - 1
                })
            }, 1000)

            return () => clearInterval(updatingTimeInterval)
        }, [displayTime])

        return (
            <View style={{
                justifyContent: "center",
                minWidth: 160,
                minHeight: 50,
                width: "30%",
                backgroundColor: "#2651EB",
                borderRadius: 50,
            }}>
                <Center>
                    <HStack>
                        <MaterialIcons name="timer" size={32} color="white" />
                        <Text fontSize="xl" fontWeight="bold">
                            {`${displayTime}s`}
                        </Text>
                    </HStack>
                </Center>
            </View>
        )
    }
    return (
        <>
            <ImageBackground source={require('../../assets/gameBackground.svg')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                <Center flex={1}>
                    <Box height="80%" minHeight="500" style={{ backgroundColor: "#CCDEDB", borderRadius: 25, justifyContent: "center" }} width="90%">
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
                                        backgroundColor: "#7297F3",
                                        justifyContent: "center"
                                    }} p={10} shadow="5">
                                        <Text fontWeight="bold" fontSize="4xl" style={{ textAlign: "center" }}>
                                            {decodeURIComponent(question.question)}
                                        </Text>
                                    </Box>
                                </VStack>

                                {/* Defender */}
                                {question.isNeutral ?
                                    <MultipleDefenders avatarNames={question.participants.filter(x => x.playerId != user.id).map(e => e.avatarName)} />
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
                                        <CustomButton answer={question.answers[0]} />
                                        <CustomButton answer={question.answers[1]} />
                                    </VStack>
                                    <VStack>
                                        <CustomButton answer={question.answers[2]} />
                                        <CustomButton answer={question.answers[3]} />
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