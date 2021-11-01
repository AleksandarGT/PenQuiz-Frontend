import { Center, Container, HStack, Text, Image, VStack, Box } from "native-base";
import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import { GetAvatarColor } from './CommonGameFunc'
import { useRecoilValue } from 'recoil'
import { gameInstanceAtom } from '../../state'
import { GetParticipantColor, gameInstanceMock } from './CommonGameFunc'

export default function GameBoards({gameInstance}) {
    const currentRoundAttacker = gameInstance.rounds.find(x => x.gameRoundNumber == gameInstance.gameRoundNumber).attackerId
    return (
        <>
            {gameInstance.participants.map(x =>
                <GamePlayerBoard key={x.id} hisTurn={x.playerId == currentRoundAttacker ? true : false} participant={x} />
            )}
        </>
    )
}

function GamePlayerBoard({ participant, hisTurn }) {

    return (
        <>
            <Box backgroundColor={GetAvatarColor(participant.avatarName)} style={hisTurn ? {
                borderWidth: 5,
                borderColor: "gold"
            } : null} width={300} p={1} m={1} borderRadius={25}>
                <HStack>
                    <Container bg="#fff" borderRadius={200} p={2}>
                        <Image
                            source={require(`../../assets/${participant.avatarName}.svg`)}
                            alt="Alternate Text"
                            resizeMode="contain"
                            size="sm"
                        />

                    </Container>
                    <Center>
                        <VStack>

                            <Text ml={2} isTruncated maxWidth={180} fontSize={{ base: "sm", md: "md", lg: "xl" }}>
                                {participant.player.username}
                            </Text>

                            <Box ml={2} width="150" bg="#fff" borderRadius={15}>
                                <Center>
                                    <Text color={GetAvatarColor(participant.avatarName)}
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