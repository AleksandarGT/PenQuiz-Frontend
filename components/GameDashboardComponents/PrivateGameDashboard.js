import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon } from 'native-base'
import { StatusCode, CreateGameLobby, JoinLobby } from '../../hooks/'
import DefaultAlert from '../Popups/DefaultAlert'
import GameDashboardBase from './GameDashboardBase'
import { useRecoilValue } from 'recoil'
import { connectionStatusAtom, joiningGameExceptionAtom } from '../../state'
export default function PrivateGameDashboard() {

    const connectionStatus = useRecoilValue(connectionStatusAtom)
    const joiningGameException = useRecoilValue(joiningGameExceptionAtom)

    const [code, setCode] = useState("")

    function CreateGameButton() {
        return (
            <Pressable onPress={() => {
                CreateGameLobby()
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
                JoinLobby(code)
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

    if (connectionStatus?.StatusCode == StatusCode.DISCONNECTED) {
        return (
            <Center flex={1}>
                <Text color="black">{connectionStatus.Error?.message}</Text>
                <ActivityIndicator size="large" />
            </Center>
        )
    }

    return (
        <GameDashboardBase>
            <Center>
                <Text textAlign="center" color="#fff" fontSize={{ base: 40, md: 60, lg: 80, xl: 90 }} style={{ fontFamily: 'Before-Collapse', }}>
                    ConQuiz
                </Text>

                {joiningGameException ? (
                    <DefaultAlert message={joiningGameException} />
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
        </GameDashboardBase>
    )
}