import React, { useState } from 'react';
import { Text, Button, Input, Center, Modal, Container, Box, Icon, HStack, Pressable, VStack, Image } from 'native-base';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useSignalR, StatusCode } from '../actions/'
import { FontAwesome5 } from "@expo/vector-icons"
import { useRecoilValue } from "recoil"
import { gameInstanceAtom } from "../state"
import ExitGameModal from './ExitGameModal'
export function GameLobby({ route, navigation }) {
    const lobby = useSignalR();
    const [avatars, setAvatars] = useState([])
    const [isClosing, setIsClosing] = useState()

    function StartGameButton({ onPress }) {
        return (
            <Pressable onPress={() => {
                onPress()
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
                    Code: {lobby.gameInstance.invitationLink}
                </Text>
            </Container>
        )
    }

    function PlayerCard({ avatarUrl, participant }) {
        return (
            <Container style={{ borderWidth: participant.playerId == lobby.gameInstance.gameCreatorId ? 5 : 0, borderColor: "gold" }} m={2} p={3} backgroundColor="white" borderRadius={20}>

                <VStack>
                    <Center>
                        <Image
                            source={require(`../assets/${avatarUrl}.svg`)}
                            alt="Alternate Text"
                            resizeMode="contain"
                            size="xl"
                        />

                        <Text mb={5} isTruncated maxWidth="90%" fontSize="xl" color="black">
                            {participant.player.username}
                        </Text>
                    </Center>

                </VStack>

            </Container>
        )
    }

    return (
        <ImageBackground source={require('../assets/gameLobby.svg')} resizeMode="cover" style={styles.image}>

            <Box position="absolute" top="0" left="0">
                <Button onPress={() => {
                    setIsClosing(true);
                }} leftIcon={<Icon as={FontAwesome5} name="arrow-left" size="sm" color="white" />} size="lg" colorScheme="danger">
                    <Text fontSize="lg" >Exit game lobby</Text>
                </Button>
            </Box>
            <Center>
                <HStack>
                    {lobby.gameInstance.participants?.map(x => {
                        return (
                            <PlayerCard key={x.playerId} participant={x} avatarUrl="penguinAvatar" />
                        )
                    })}


                </HStack>
                <ExitGameModal backAction={isClosing}
                    onAccept={() => {
                        lobby.LeaveGameLobby()
                        setIsClosing(false)
                    }}
                    onClose={() => {
                        setIsClosing(false)
                    }} />
                <CodeCard />
                <StartGameButton onPress={() =>
                    // setAvatars([...avatars, `penguinAvatar${avatars.length > 0 ? avatars.length + 1 : ""}`])
                    console.log(lobby.gameInstance)
                } />
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