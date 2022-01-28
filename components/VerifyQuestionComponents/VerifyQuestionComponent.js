import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon, AspectRatio } from 'native-base'
import { useRecoilValue } from 'recoil'
import { authAtom } from '../../state'
import { useFetchWrapper } from '../../helpers'
import { BACKEND_GAME_API_URL } from '@env'
import { useIsFocused } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

export function VerifyQuestionComponent() {
    const windowWidth = Dimensions.get('screen').width;

    function ButtonTemplate({ onPressEvent, buttonText, left, right }) {
        return (
            <Pressable onPress={() => {
                onPressEvent()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} shadow={3} bg={isPressed ? "#8EC8CD" : isHovered ? "#ACE6EB" : "#C8FBFF"} p={2} borderRadius={50}>
                            <Box px={4} pb={1} pt={1}>
                                <HStack justifyContent="center">
                                    {left && <Center>
                                        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
                                    </Center>}

                                    <Text fontSize={{ base: "md", md: "md", lg: "lg", xl: "xl" }} color="#032157" fontStyle="italic">
                                        {buttonText}
                                    </Text>

                                    {right && <Center>
                                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                                    </Center>}
                                </HStack>

                            </Box>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }

    function QuestionRow({ type, question }) {
        return (
            <Pressable>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box width="100%" p={2} borderWidth={2} borderColor="#B6F6FF" bg={isPressed ? "#000" : isHovered ? "#123" : "#0F5688"}>
                            <HStack justifyContent="space-between">
                                <Box>
                                    <HStack>
                                        <AspectRatio p={Platform.OS == "web" ? 4 : 3} bg="white" ratio={1 / 1} borderRadius={10}>
                                            <Center>
                                                <Text color="black" fontSize={Platform.OS == "web" ? "md" : "xs"}>
                                                    {type == "multiple" ? "abc" : type == "number" ? "123" : "--"}
                                                </Text>
                                            </Center>
                                        </AspectRatio>
                                        <Text alignSelf="center" ml={3} isTruncated maxW={windowWidth * 0.4} fontSize={{ base: "md", md: "md", lg: "lg", xl: "xl" }}>
                                        {question}
                                        </Text>
                                    </HStack>
                                </Box>
                                <Center>
                                    <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                                </Center>


                            </HStack>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../../assets/homeBackground.svg') : require('../../assets/homeBackground.png')} resizeMode="cover" style={styles.image}>
            <View style={{ alignItems: "center" }}>

                <Box width="90%" minWidth="70%" bg="#071D56" p={10} borderRadius={25}>
                    <Text mb={5} textAlign="center" color="#fff" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "3xl" }} style={{ fontFamily: 'Before-Collapse', }}>
                        User question submissions
                    </Text>

                    <Box>
                        <VStack>
                            {[...Array(6)].map((e, index) => {
                                return (
                                    <QuestionRow type={index % 2 == 0 ? "multiple" : "number"} question={Math.random().toString() + Math.random().toString() + Math.random().toString() + Math.random().toString() + Math.random().toString() + Math.random().toString()} />
                                )
                            })}
                        </VStack>
                    </Box>
                    <HStack justifyContent="space-between" mt={5} mx={2}>
                        <ButtonTemplate left buttonText="Previous" />
                        <ButtonTemplate right buttonText="Next" />

                    </HStack>

                </Box>
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
})