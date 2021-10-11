import React, { useState } from 'react';
import { Text, Button, Input, Center, Modal, Container, Box, Icon, HStack, Pressable, VStack, Image } from 'native-base';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useGameLobby, StatusCode } from '../actions/'
import { FontAwesome5 } from "@expo/vector-icons"

export function GameLobby({ route, navigation }) {
    const lobby = useGameLobby();

    const [backAction, setBackAction] = useState()
    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {

                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                setBackAction(e.data.action)

            }),
        [navigation]
    );



    function CustomModal() {
        return (
            <Modal isOpen={backAction} onClose={() => setBackAction(null)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Leave Lobby</Modal.Header>
                    <Modal.Body>
                        <Text>
                            Are you sure you want to leave the game lobby? If you are the owner of it, the lobby will be canceled.
                        </Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                onPress={() => {
                                    setBackAction(null)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onPress={() => {
                                    lobby.LeaveGameLobby()
                                    setBackAction(null)
                                    navigation.dispatch(backAction)
                                }}
                            >
                                Exit lobby
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        )

    }

    function StartGameButton() {
        return (
            <Pressable onPress={() => {
                lobby.CreateGameLobby()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} mt={6} shadow={3} bg={isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"} p={2} borderRadius={50}>
                            <Box px={4} pb={2} pt={2}>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }}>
                                    Start Game
                                </Text>
                            </Box>
                        </Box>
                    )
                }}
            </Pressable>
        )
    }

    function CodeCard() {
        return (
            <Container backgroundColor="#C8FBFF" py={6} style={{ paddingHorizontal: "10%" }} borderRadius={15}>
                <Text color="black" fontWeight="bold" fontSize="3xl">
                    Code: {lobby?.gameInstance?.invitationLink}
                </Text>
            </Container>
        )
    }

    function PlayerCard({avatarUrl}) {
        return (
            <Container m={2} p={3} backgroundColor="white" borderRadius={20}>

                <VStack>
                    <Center>
                        <Box>
                            <Image
                                source={require(`../assets/${avatarUrl}.svg`)}
                                alt="Alternate Text"
                                resizeMode="contain"
                                size="xl"
                            />
                        </Box>
                    </Center>
                    <Center>

                        <Text mb={5} fontSize="xl" color="black">
                            BoostedPenguin
                        </Text>
                    </Center>

                </VStack>

            </Container>
        )
    }

    return (
        <ImageBackground source={require('../assets/gameLobby.svg')}  resizeMode="cover" style={styles.image}>

            <Box position="absolute" top="0" left="0">
                <Button onPress={() => {
                    navigation.pop()
                }} leftIcon={<Icon as={FontAwesome5} name="arrow-left" size="sm" color="white" />} size="lg" colorScheme="danger">
                    <Text fontSize="lg" >Exit game lobby</Text>
                </Button>
            </Box>
            <Center>
                <HStack>
                    <PlayerCard avatarUrl="penguinAvatar" />
                    <PlayerCard avatarUrl="penguin2Avatar" />
                    <PlayerCard avatarUrl="penguin3Avatar" />

                </HStack>
                <CustomModal />
                <CodeCard />
                <StartGameButton />
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