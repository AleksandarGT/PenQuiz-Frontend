import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon, Divider } from 'native-base'
import { useSignalR, StatusCode } from '../../hooks/'
import DefaultAlert from '../Popups/DefaultAlert'
import GameDashboardBase from './GameDashboardBase'

export default function PublicGameDashboard() {
    const lobby = useSignalR()
    function FindGameButton() {
        return (
            <Pressable onPress={() => {
                lobby.FindPublicMatch()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} shadow={3} bg={isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"} p={2} borderRadius={50}>
                            <Box px={4} pb={2} pt={2}>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }}>
                                    Find Game
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
        <GameDashboardBase>
            <Center>
                <Text textAlign="center" color="#fff" fontSize={{ base: 40, md: 60, lg: 80, xl: 90 }} style={{ fontFamily: 'Before-Collapse', }}>
                    ConQuiz
                </Text>
                <Box px={4}>
                    <Text textAlign="center" color="#fff" fontSize={{ base: 18, md: 24, lg: 36, xl: 40 }} style={{ fontFamily: 'Before-Collapse' }}>
                        start your{"\n"}
                        adventure now
                    </Text>
                </Box>

                {lobby.joiningGameException ? (
                    <DefaultAlert message={lobby.joiningGameException} />
                ) : null}


                <FindGameButton />
            </Center>
        </GameDashboardBase>
    )
}