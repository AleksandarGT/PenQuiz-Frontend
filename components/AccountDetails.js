import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon, AspectRatio, Container } from 'native-base'
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

    function SquareStat({ topText, bottomText }) {
        return (
            <Box borderRadius={25} bg="#C8FBFF" p={8} minW={150} minH={150}>
                <Center>
                    <Text color="black" fontWeight="bold" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "4xl" }}>
                        {topText}
                    </Text>
                    <Text color="black" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "2xl" }}>
                        {bottomText}
                    </Text>
                </Center>
            </Box>
        )
    }

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../assets/homeBackground.svg') : require('../assets/homeBackground.png')} resizeMode="cover" style={styles.image}>
            <Center>
                <Box bg="#071D56" p={8} borderRadius={35} width="40%" minW={600}>
                    <Text mb={5} textAlign="center" color="#fff" fontSize={{ base: "md", md: "lg", lg: "xl", xl: "4xl" }} style={{ fontFamily: 'Before-Collapse', }}>
                        {authValue?.username}
                        {"\n"}
                        Statistics
                    </Text>

                    <HStack justifyContent="space-around">
                        <SquareStat topText={userStatistics?.totalGames ?? 0} bottomText="Games" />
                        <SquareStat topText={userStatistics?.gamesWon ?? 0} bottomText="Wins" />
                        <SquareStat topText={`${userStatistics?.winPercentage}%` ?? "0%"} bottomText="Win rate" />
                    </HStack>
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