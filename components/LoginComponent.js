import React, { useEffect, useState } from 'react'

import { ImageBackground, Platform, StyleSheet, View } from "react-native"
import { VStack, Box, Divider, Text, Center, Heading, Button, Icon, Image, Pressable, HStack, Modal, Container } from 'native-base'
import { FontAwesome5 } from "@expo/vector-icons"
import { authStatus, authAtom } from '../state'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useAuthActions } from '../hooks'
import { justifyContent } from 'styled-system'
import RulesModal from './Popups/RulesModal'
import AboutModal from './Popups/AboutModal'
import DefaultAlert from './Popups/DefaultAlert'
import { useWebGoogleAuth } from '../hooks/useWebGoogleAuth'
import { useAndroidGoogleAuth } from '../hooks/useAndroidGoogleAuth'
import { Audio } from 'expo-av'

export default function LoginComponent({ history }) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/crackbd.jpg')} resizeMode="cover" style={styles.image}>
                <Center>
                    <RenderCard />
                </Center>
            </ImageBackground>
        </View>
    )
}


function RenderAntarctica() {
    if (Platform.OS === 'web') {
        return (
            <Center >
                <Image
                    source={require('../assets/minified_antarctica.svg')}
                    style={{ resizeMode: 'contain' }}
                    alt="Alternate Text"
                    size="lg"
                />
            </Center>
        )
    }
    else {
        return null
    }
}


function RenderCard() {
    const userActions = useAuthActions()
    const googleActions = Platform.select({
        web: useWebGoogleAuth(),
        android: useAndroidGoogleAuth(),
    })
    const setAuth = useSetRecoilState(authAtom)
    const [isLoading, setIsLoading] = useState(false)
    const [showRulesModal, setShowRulesModal] = useState(false)
    const [showAboutModal, setShowAboutModal] = useState(false)
    const [serverError, setServerError] = useState()

    // Monitor google response
    useEffect(() => {
        if (Platform.OS != "web") return
        if (googleActions.googleResponse?.type === 'success') {
            onLogin({ tokenId: googleActions.googleResponse.params.id_token })
            setIsLoading(false)
        }
        else if (googleActions.googleResponse?.type === 'dismiss') {
            setAuth(null)
            setIsLoading(false)
        }
    }, [googleActions?.googleResponse])

    // On resposne from google
    function onLogin({ tokenId }) {
        return userActions.login(tokenId).then(res => setServerError(null)).catch(error => {
            setAuth(null)
            console.log(error)
            setServerError(error?.message ? error.message : "Unknown server error")
        })
    }

    // On button trigger
    async function onLoginClick() {
        //setAuth({ status: 'LOADING' })
        setIsLoading(true)

        if (Platform.OS == "android") {
            const res = await googleActions.googlePromptAsync()
            if (res.status == "success") {
                onLogin({
                    tokenId: res.idToken
                })
            }
        }
        else {
            googleActions.googlePromptAsync()
        }
    }

    return (
        <Box shadow={9} bg="#0E85A4" p={4} borderRadius={50}>
            <VStack space={Platform.OS == "web" ? 4 : 1} >
                {RenderAntarctica()}
                <RulesModal showRulesModal={showRulesModal} setShowRulesModal={setShowRulesModal} />
                <AboutModal showAboutModal={showAboutModal} setShowAboutModal={setShowAboutModal} />
                <Box px={4} >
                    <Text textAlign="center" color="#fff" fontSize={{ base: 40, md: 60, lg: 80 }} style={{ fontFamily: 'Before-Collapse', }}>
                        ConQuiz
                    </Text>
                </Box>
                <Box px={4}>
                    <Text textAlign="center" color="#fff" fontSize={{ base: 18, md: 24, lg: 36, xl: 40 }} style={{ fontFamily: 'Before-Collapse' }}>
                        start your{"\n"}
                        adventure now
                    </Text>

                </Box>
                <Box px={4} pb={4} pt={4}>
                    {serverError &&
                        <Center >
                            <DefaultAlert message={serverError} />
                        </Center>
                    }

                    <Button
                        py={3}
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        size="lg"
                        colorScheme={"white_bd"}
                        onPress={() => onLoginClick()}
                        leftIcon={<Icon color="black" as={FontAwesome5} name="google" size="sm" />}
                    >
                        <Text fontSize="md" fontWeight={"bold"} color="black">
                            Sign in with Google

                        </Text>

                    </Button>
                </Box>
                <Divider bg="white" thickness="1" />

                <Button.Group
                    mx={{
                        base: "auto",
                        md: 0,
                    }}
                    justifyContent="space-around"
                >
                    <Button px={7} size="lg" bg="#006078" style={{ alignSelf: 'flex-start' }} onPress={() => setShowRulesModal(true)}>Rules</Button>
                    <Button px={7} size="lg" bg="#006078" onPress={() => setShowAboutModal(true)}>About</Button>
                </Button.Group>
            </VStack>
        </Box>
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