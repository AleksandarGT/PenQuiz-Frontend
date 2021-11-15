import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable } from 'native-base'
import React, { useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { GetAvatarColor } from './CommonGameFunc';

export default function MultipleChoiceScreen() {
    const questionMock = {
        "id": 1,
        "question": "When was Bulgaria founded?",
        "type": "multiple",
        "answers": [
            {
                "id": 1,
                "answer": "681"
            },
            {
                "id": 2,
                "answer": "1332"
            },
            {
                "id": 3,
                "answer": "806"
            },
            {
                "id": 4,
                "answer": "927"
            },
        ]
    }

    const timer = 30

    function PlayerAvatar({ supportIcon, avatarName }) {
        return (
            <VStack flex={1}>
                <Center>
                    <Box style={{ backgroundColor: GetAvatarColor(avatarName), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={require(`../../assets/${avatarName}.svg`)}
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
                            source={require(`../../assets/${supportIcon}.svg`)}
                            alt="Alternate Text"
                            resizeMode="contain"
                            size="sm"
                        />
                    </Center>
                </Center>

            </VStack>
        )
    }

    function MultipleDefenders({avatarName, secondAvatarName}) {
        return (
            <VStack flex={1}>
                <Center>
                    <Box style={{ backgroundColor: GetAvatarColor(avatarName), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={require(`../../assets/${avatarName}.svg`)}
                                        alt="Alternate Text"
                                        resizeMode="contain"
                                        size="md"
                                    />
                                </Center>
                            </VStack>
                        </Box>
                    </Box>

                    <Box style={{ backgroundColor: GetAvatarColor(secondAvatarName), borderRadius: 20 }} shadow={7}>
                        <Box m={2} p={2} backgroundColor="white" borderRadius={2000} shadow={5}>
                            <VStack>
                                <Center>
                                    <Image
                                        source={require(`../../assets/${secondAvatarName}.svg`)}
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
                                    {answer.answer}
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
            <ImageBackground source={require('../../assets/gameBackground.svg')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                <Center flex={1}>
                    <Box height="80%" minHeight="500" style={{ backgroundColor: "#CCDEDB", borderRadius: 25, justifyContent: "center" }} width="90%">
                        <Box >
                            <Center>
                                {/* Top Timer */}
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
                                                {`${timer}s`}
                                            </Text>
                                        </HStack>
                                    </Center>
                                </View>
                            </Center>

                            {/* Question / Avatars */}
                            <HStack style={{ margin: 10 }}>


                                {/* Attacker */}
                                <PlayerAvatar supportIcon={"sword"} avatarName={"penguinAvatar"} />


                                {/* Question */}
                                <VStack flex={4} >
                                    <Box style={{
                                        height: "100%",
                                        borderRadius: 30,
                                        backgroundColor: "#7297F3",
                                        justifyContent: "center"
                                    }} p={10} shadow="5">
                                        <Text fontWeight="bold" fontSize="4xl" style={{ textAlign: "center" }}>
                                            {questionMock.question}
                                        </Text>
                                    </Box>
                                </VStack>

                                {/* Defender */}
                                <PlayerAvatar supportIcon={"shield"} avatarName={"penguinAvatar2"} />

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
                                        <CustomButton answer={questionMock.answers[0]} />
                                        <CustomButton answer={questionMock.answers[1]} />
                                    </VStack>
                                    <VStack>
                                        <CustomButton answer={questionMock.answers[2]} />
                                        <CustomButton answer={questionMock.answers[3]} />
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