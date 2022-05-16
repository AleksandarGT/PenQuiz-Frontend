import React, { useState } from 'react'
import { Text, Button, Center, Container, Box, Icon, HStack, Pressable, VStack, Image } from 'native-base'
import { StyleSheet, ImageBackground, ActivityIndicator, Platform } from 'react-native'
import { LeaveGameLobby, StartGame } from '../hooks'
import { FontAwesome5 } from "@expo/vector-icons"
import { useRecoilValue } from "recoil"
import { connectionStatusAtom, gameInstanceAtom, userIdSelector } from "../state"
import ExitGameModal from './Popups/ExitGameModal'
import { GetPenguinAvatarImage } from './GameMapComponents/CommonGameFunc'
import { GameInstanceResponse, ParticipantsResponse } from '../types/gameInstanceTypes'
import { GameHubStatusCode } from '../types/hubTypes'

export function GameLobby() {
    // There is no condition where the game instanec is null at this point
    const gameInstance = useRecoilValue(gameInstanceAtom) as GameInstanceResponse
    const connectionStatus = useRecoilValue(connectionStatusAtom)

    const [isClosing, setIsClosing] = useState(false)
    const RequiredPlayers = 3
    const userId = useRecoilValue(userIdSelector)

    const IsLobbyFull = () => gameInstance.participants?.length == RequiredPlayers ? true : false
    const IsGameHost = () => userId == gameInstance.gameCreatorId ? true : false

    // Gametype - 0 public, 1 private
    function StartGameButton({ onPress }: { onPress: () => void }) {
        return (
            <Pressable disabled={!IsGameHost() || !IsLobbyFull()} onPress={() => {
                gameInstance.gameType == 1 && onPress()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box px={9} mt={6} shadow={3} bg={
                            !IsLobbyFull() ? "#4D66A5" :
                                isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"
                        } p={2} borderRadius={50}>
                            <Box px={4} pb={2} pt={2}>
                                <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }}>
                                    {!IsLobbyFull() ? `Waiting for ${RequiredPlayers - gameInstance.participants?.length} more players` : IsGameHost() ? "Start game" : "Waiting for host to start"}
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
            <Container backgroundColor="#C8FBFF" py={Platform.OS == "web" ? 6 : 2} style={{ paddingHorizontal: "10%" }} shadow={3} borderRadius={15}>
                <Text color="black" fontWeight="bold" fontSize="3xl">
                    Code: {gameInstance.invitationLink}
                </Text>
            </Container>
        )
    }

    function PlayerCard({ participant }: { participant: ParticipantsResponse }) {
        return (
            <Container style={{ borderWidth: participant.playerId == gameInstance.gameCreatorId ? 5 : 0, borderColor: "gold", }} m={5} p={3} backgroundColor="white" borderRadius={20}>
                <VStack >
                    <Center>
                        <Image
                            source={GetPenguinAvatarImage(participant.avatarName)}
                            alt="Alternate Text"
                            resizeMode="contain"
                            size={Platform.OS === 'web' ? "xl" : "sm"}
                        />

                    </Center>
                    <Center>
                        <Text isTruncated maxWidth="250" fontSize="xl" color="black">
                            {participant.player?.username}
                        </Text>

                        {participant.playerId == gameInstance.gameCreatorId ? (
                            <Text isTruncated maxWidth="90%" fontSize="md" color="black">
                                (host)
                            </Text>
                        ) : null}
                    </Center>
                </VStack>

            </Container>
        )
    }

    if (connectionStatus && connectionStatus.StatusCode == GameHubStatusCode.DISCONNECTED) {
        return (
            <Center flex={1}>
                <Text color="black">{connectionStatus.Error}</Text>
                <ActivityIndicator size="large" />
            </Center>
        )
    }

    return (
        <ImageBackground source={Platform.OS === 'web' ? require('../assets/gameLobby.svg') : require('../assets/gameLobby.png')} resizeMode="cover" style={styles.image}>
            {isClosing && <ExitGameModal backAction={isClosing}
                onAccept={() => {
                    LeaveGameLobby()
                    setIsClosing(false)
                }}
                onClose={() => {
                    setIsClosing(false)
                }} />}

            <Box position="absolute" top="0" left="0">
                <Button onPress={() => {
                    setIsClosing(true)
                }} leftIcon={<Icon as={FontAwesome5} name="arrow-left" size="sm" color="white" />} size="lg" colorScheme="danger">
                    <Text fontSize="lg" >Exit game lobby</Text>
                </Button>
            </Box>


            <Center>
                <HStack>
                    {gameInstance.participants?.map(x => {
                        return (
                            <PlayerCard key={x.playerId} participant={x} />
                        )
                    })}


                </HStack>

                {gameInstance.gameType == 1 && CodeCard()}
                <StartGameButton onPress={() =>
                    StartGame()
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
})