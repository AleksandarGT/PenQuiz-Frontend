import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon } from 'native-base'
import { useSignalR, StatusCode } from '../hooks/'
import DefaultAlert from './Popups/DefaultAlert'
import { Ionicons } from '@expo/vector-icons'
import RulesModal from './Popups/RulesModal'
import GameEndModal from './Popups/GameEndModal'

export function HomeGame({ navigation, route }) {
    const lobby = useSignalR()
    const [code, setCode] = useState("")
    const [showRulesModal, setShowRulesModal] = useState(false)

    function CreateGameButton() {
        return (
            <Pressable onPress={() => {
                lobby.CreateGameLobby()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} shadow={3} bg={isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"} p={2} borderRadius={50}>
                            <Box px={4} pb={2} pt={2}>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }}>
                                    Create Game
                                </Text>
                            </Box>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }

    function JoinGameButton() {
        return (
            <Pressable onPress={() => {
                lobby.JoinLobby(code)
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box shadow={3} bg={isPressed ? "#C6C6C6" : isHovered ? "#D7D7D7" : "white"} px={8} borderRadius={25}>
                            <Box px={4} >
                                <Text color="black" fontSize={{ base: "md", md: "lg", lg: "xl", xl: 25 }}>
                                    Join Game
                                </Text>
                            </Box>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }



    if (lobby.connectionStatus?.StatusCode == StatusCode.DISCONNECTED) {
        return (
            <Center flex={1}>
                <Text color="black">{lobby.connectionStatus.Error?.message}</Text>
                <ActivityIndicator size="large" />
            </Center>
        )
    }


    return (
        <ImageBackground source={require('../assets/homeBackground.svg')} resizeMode="cover" style={styles.image}>
            <Box top="5" position="absolute" right="5">
                <Center>
                    <IconButton
                        onPress={() => {
                            setShowRulesModal(true)
                        }}
                        size="md"
                        variant="outline"
                        _icon={{
                            as: Ionicons,
                            name: "game-controller",
                            color: "white"
                        }}
                    />
                </Center>
            </Box>
            <RulesModal showRulesModal={showRulesModal} setShowRulesModal={setShowRulesModal} />
            <Center >
                <Text textAlign="center" color="#fff" fontSize={{ base: 40, md: 60, lg: 80, xl: 90 }} style={{ fontFamily: 'Before-Collapse', }}>
                    ConQuiz
                </Text>

                {lobby.joiningGameException ? (
                    <DefaultAlert message={lobby.joiningGameException} />
                ) : null}


                <CreateGameButton />
                <Input onChangeText={(e) => {
                    if (/^\d+$/.test(e) || !e) {
                        setCode(e)
                    }
                }}
                    maxLength={4}
                    value={code}
                    keyboardType="numeric"
                    mt={9}
                    mb={2}
                    variant="rounded"
                    bg="#D7D7D7"
                    color="black"
                    _hover={{ bg: "#C6C6C6" }}
                    size="md"
                    placeholder="Enter code" />
                <JoinGameButton />
            </Center>
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