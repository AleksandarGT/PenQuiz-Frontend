import { Center, Container, HStack, Text, Image, VStack, Box } from "native-base"
import React from "react"
import { Platform } from 'react-native'
import { GetAvatarColor, GetPenguinAvatarImage } from './CommonGameFunc'
import { GameInstanceResponse, ParticipantsResponse } from "../../types/gameInstanceTypes"

export default function GameBoards({ gameInstance, currentAttackerId }: { gameInstance: GameInstanceResponse, currentAttackerId?: number }) {
    return (
        <>
            {gameInstance.participants.map(x =>
                <GamePlayerBoard key={x.id} hisTurn={x.playerId == currentAttackerId} participant={x} />
            )}
        </>
    )
}

function GamePlayerBoard({ participant, hisTurn }: { participant: ParticipantsResponse, hisTurn?: boolean }) {

    return (
        <>
            <Box backgroundColor={GetAvatarColor(participant.inGameParticipantNumber)} style={hisTurn ? {
                borderWidth: 5,
                borderColor: "gold"
            } : null} width={Platform.OS == "web" ? 300 : 250} p={1} m={1} borderRadius={25}>
                <HStack>
                    <Container bg="#fff" borderRadius={200} p={2}>
                        <Image
                            source={GetPenguinAvatarImage(participant.avatarName)}
                            alt="Alternate Text"
                            resizeMode="contain"
                            size={Platform.OS == "web" ? "sm" : "xs"}
                        />

                    </Container>
                    <Center>
                        <VStack>

                            <Text ml={2} isTruncated maxWidth={180} fontSize={{ base: "sm", md: "md", lg: "xl" }}>
                                {`${participant.isAfk ? "[AFK]" : ""} ${participant.player?.username}`}
                            </Text>

                            <Box ml={2} width="150" bg="#fff" borderRadius={15}>
                                <Center>
                                    <Text color={GetAvatarColor(participant.inGameParticipantNumber)}
                                        fontSize={{ base: "sm", md: "md", lg: "xl" }}>
                                        {participant.score}
                                    </Text>
                                </Center>
                            </Box>

                        </VStack>
                    </Center>
                </HStack>
            </Box>
        </>
    )
}