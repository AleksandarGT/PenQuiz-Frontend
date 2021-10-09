import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text, Button, Center, Box, Pressable, Input, Alert, VStack, HStack, IconButton, CloseIcon } from 'native-base';
import { useGameLobby } from '../actions/'

export function HomeGame({ navigation, route }) {
    const lobby = useGameLobby();



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
                lobby.JoinLobby();
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

    function RenderAlert({message}) {
        return (
            <Alert my={3} maxW="80%" status="error">
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

    if (lobby.isDisconnected) {
        return (
            <>
                <ActivityIndicator size="large" />
            </>
        )
    }


    return (
        <ImageBackground source={require('../assets/homeBackground.svg')} resizeMode="cover" style={styles.image}>
            <Center >
                <Text textAlign="center" color="#fff" fontSize={{ base: 40, md: 60, lg: 80, xl: 90 }} style={{ fontFamily: 'Before-Collapse', }}>
                    ConQuiz
                </Text>

                {lobby.joiningGameException ? (
                    <RenderAlert message={lobby.joiningGameException} />
                ) : null}


                <CreateGameButton />
                <Input onChangeText={(e) => {
                    if (/^\d+$/.test(e) || !e) {
                        lobby.setCode(e)
                    }
                }}
                    maxLength={4}
                    value={lobby.code}
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
});