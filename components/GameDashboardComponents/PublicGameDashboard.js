import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon, Divider } from 'native-base'
import { StatusCode } from '../../hooks/'
import DefaultAlert from '../Popups/DefaultAlert'
import GameDashboardBase from './GameDashboardBase'
import { useRecoilValue } from 'recoil'
import { connectionStatusAtom, joiningGameExceptionAtom } from '../../state'
import { FindPublicMatch } from '../../hooks/useSignalR'
import { GameHubStatusCode } from '../../types/hubTypes'

export default function PublicGameDashboard() {
    const connectionStatus = useRecoilValue(connectionStatusAtom)
    const joiningGameException = useRecoilValue(joiningGameExceptionAtom)

    function FindGameButton() {
        return (
            <Pressable onPress={() => {
                FindPublicMatch()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} shadow={3} bg={isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"} p={2} borderRadius={50}>
                            <Box px={4} pb={2} pt={2}>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }} >
                                    Find Game
                                </Text>
                            </Box>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }


    if (connectionStatus?.StatusCode == GameHubStatusCode.DISCONNECTED) {
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
                <Box px={4}>
                    <Text textAlign="center" color="#fff" fontSize={{ base: 18, md: 24, lg: 36, xl: 40 }} style={{ fontFamily: 'Before-Collapse' }}>
                        start your{"\n"}
                        adventure now
                    </Text>
                </Box>

                {joiningGameException ? (
                    <DefaultAlert message={joiningGameException} />
                ) : null}


                <FindGameButton />
            </Center>
        </GameDashboardBase>
    )
}