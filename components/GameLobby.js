import React, { useState } from 'react';
import { Text, Button, Input, Center, Modal, Container, Box, Icon, HStack, Pressable, VStack, Image } from 'native-base';
import { View, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { useSignalR, StatusCode } from '../hooks/'
import { FontAwesome5 } from "@expo/vector-icons"
import { useRecoilValue } from "recoil"
import { userIdSelector } from "../state"
import ExitGameModal from './Popups/ExitGameModal'
import { Heading } from 'native-base';

export function GameLobby({ route, navigation }) {
    const lobby = useSignalR();
    const [isClosing, setIsClosing] = useState()
    const RequiredPlayers = 3
    const userId = useRecoilValue(userIdSelector)
    const IsLobbyFull = () => lobby.gameInstance.participants?.length == RequiredPlayers ? true : false
    const IsGameHost = () => userId == lobby.gameInstance.gameCreatorId ? true : false


    function StartGameButton({ onPress }) {
        return (
            <Pressable disabled={!IsGameHost() || !IsLobbyFull()} onPress={() => {
                onPress()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} mt={6} shadow={3} bg={
                            !IsLobbyFull() ? "#4D66A5" :
                                isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"
                        } p={2} borderRadius={50}>
                            <Box px={4} pb={2} pt={2}>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }}>
                                    {!IsLobbyFull() ? `Waiting for ${RequiredPlayers - lobby.gameInstance.participants?.length} more players` : IsGameHost() ? "Start game" : "Waiting for host to start"} 
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
            <Container backgroundColor="#C8FBFF" py={6} style={{ paddingHorizontal: "10%" }} shadow={3} borderRadius={15}>
                <Text color="black" fontWeight="bold" fontSize="3xl">
                    Code: {lobby.gameInstance.invitationLink}
                </Text>
            </Container>
        )
    }

    function PlayerCard({ participant }) {
        return (
            <Container style={{ borderWidth: participant.playerId == lobby.gameInstance.gameCreatorId ? 5 : 0, borderColor: "gold", }} m={5} p={3} backgroundColor="white" borderRadius={20}>

                <VStack>
                    <Center>
                        <Image
                            source={require(`../assets/${participant.avatarName}.svg`)}
                            alt="Alternate Text"
                            resizeMode="contain"
                            size="xl"
                        />

                    </Center>
                    <Center>
                        <Text isTruncated maxWidth="90%" fontSize="xl" color="black">
                            {participant.player.username}
                        </Text>

                        {participant.playerId == lobby.gameInstance.gameCreatorId ? (
                            <Text isTruncated maxWidth="90%" fontSize="md" color="black">
                                (host)
                            </Text>
                        ) : null}
                    </Center>
                </VStack>

            </Container>
        )
    }

    if (lobby.connectionStatus.StatusCode == StatusCode.DISCONNECTED) {
        return (
            <Center flex={1}>
                <Text color="black">{lobby.connectionStatus.Error?.message}</Text>
                <ActivityIndicator size="large" />
            </Center>
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
                            <PlayerCard key={x.playerId} participant={x} />
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
                    lobby.StartGame()
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