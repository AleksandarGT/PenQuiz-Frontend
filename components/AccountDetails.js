import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon } from 'native-base'
import DefaultAlert from './Popups/DefaultAlert'
import { useRecoilValue } from 'recoil'
import { authAtom } from '../state'
import { useFetchWrapper } from '../helpers'
import { BACKEND_GAME_API_URL } from '@env'
import { useIsFocused } from '@react-navigation/native'

export function AccountDetails() {
    var authValue = useRecoilValue(authAtom)
    const [userStatistics, setUserStatistics] = useState()
    const fetchWrapper = useFetchWrapper()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (!isFocused) return
        const baseUrl = `${BACKEND_GAME_API_URL}/api/game`

        fetchWrapper.get(`${baseUrl}/statistics`)
            .then(response => {
                setUserStatistics(response)
            })
            .catch(er => {
                console.log(er)
            })
    }, [isFocused])

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../assets/homeBackground.svg') : require('../assets/homeBackground.png')} resizeMode="cover" style={styles.image}>
            <Center>
                <Box bg="#071D56" p={5} borderRadius={25}>
                    <Text textAlign="center" color="#fff" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "3xl" }} style={{ fontFamily: 'Before-Collapse', }}>
                        {authValue?.username}
                    </Text>
                    <Text mt={2} textAlign="center" color="#fff" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "2xl" }} style={{ fontFamily: 'Before-Collapse', }}>
                        Total games: {userStatistics?.totalGames ?? 0}{"\n"}
                        Total wins: {userStatistics?.gamesWon ?? 0}{"\n"}
                        Win percentage: {userStatistics?.winPercentage ?? 0}%{"\n"}
                    </Text>
                </Box>
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