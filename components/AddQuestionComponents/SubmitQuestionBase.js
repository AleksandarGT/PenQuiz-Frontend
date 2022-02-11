import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon, Stack, Icon } from 'native-base'
import { useIsFocused } from '@react-navigation/native'
import { AddNumberQuestion } from './AddNumberQuestion'
import { AddMCQuestion } from './AddMCQuestion'
import { MaterialIcons } from "@expo/vector-icons"

export function SubmitQuestionBase() {
    const [currentScreen, setCurrentScreen] = useState("base")
    const [successMessage, setSuccessMessage] = useState()

    const isFocused = useIsFocused()

    useEffect(() => {
        if (!isFocused) {
            setCurrentScreen("base")
            setSuccessMessage("")
        }
    }, [isFocused])


    function ButtonTemplate({ onPressEvent, buttonText }) {
        return (
            <Pressable onPress={() => {
                onPressEvent()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} shadow={3} bg={isPressed ? "#8EC8CD" : isHovered ? "#ACE6EB" : "#C8FBFF"} p={2} borderRadius={50}>
                            <Box px={4} pb={2} pt={2}>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }} color="#032157" fontStyle="italic">
                                    {buttonText}
                                </Text>
                            </Box>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }

    function SuccessAlert({ message }) {
        return (
            <Alert my={3} maxW="90%" status="success">
                <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} >
                        <Alert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                            {message}
                        </Text>
                    </HStack>
                </VStack>
            </Alert>
        )
    }

    function RenderBase() {
        return (
            <Center>
                <Text mb={9} textAlign="center" color="#fff" fontSize={{ base: 30, md: 40, lg: 50, xl: 60 }} style={{ fontFamily: 'Before-Collapse', }}>
                    Add your own{"\n"}question
                </Text>

                {successMessage && <SuccessAlert message={successMessage} />}
                <ButtonTemplate onPressEvent={() => setCurrentScreen("number")} buttonText="Open question" />
                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }}>Or</Text>
                <ButtonTemplate onPressEvent={() => setCurrentScreen("multiple")} buttonText="Closed question" />

            </Center>
        )
    }
    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../../assets/homeBackground.svg') : require('../../assets/homeBackground.png')} resizeMode="cover" style={styles.image}>
            {currentScreen != "base" && <Button onPress={() => setCurrentScreen("base")} colorScheme='white_bd' variant="outline" color="white" style={{ position: "absolute", top: 50, left: 50 }} leftIcon={<Icon as={MaterialIcons} name="arrow-back-ios" size="sm" />}>
                Back
            </Button>}
            {currentScreen == "base" ? <RenderBase /> : currentScreen == "number" ?
                <AddNumberQuestion backToBase={(res) => {
                    setCurrentScreen("base")
                    setSuccessMessage(res)
                }} /> :
                <AddMCQuestion backToBase={(res) => {
                    setCurrentScreen("base")
                    setSuccessMessage(res)
                }} />}
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