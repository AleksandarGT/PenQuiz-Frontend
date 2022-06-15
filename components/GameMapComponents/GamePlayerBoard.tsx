import { Center, Container, HStack, Text, Image, VStack, Box } from "native-base"
import React, { useMemo } from "react"
import { Platform } from 'react-native'
import { GetAvatarColor, GetPenguinAvatarImage } from './CommonGameFunc'
import { GameInstanceResponse, ParticipantsResponse } from "../../types/gameInstanceTypes"
import { CharacterType } from "../../types/gameCharacterTypes"

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

    const kingCharacterMultiplier = useMemo(() => {

        const characterAbilities = participant.gameCharacter.characterAbilities
        if (characterAbilities.characterType != CharacterType.KING)
            return { isKing: false }

        const originalPoints = participant.score - characterAbilities.kingCharacterAbilitiesResponse!.currentBonusPoints

        return { isKing: true, additionalPoints: characterAbilities.kingCharacterAbilitiesResponse!.currentBonusPoints, originalPoints: originalPoints }

    }, [participant])
    return (
        <>
            <Box backgroundColor={GetAvatarColor(participant.inGameParticipantNumber)} style={hisTurn ? {
                borderWidth: 5,
                borderColor: "gold"
            } : null} width={Platform.OS == "web" ? 300 : 250} p={1} m={1} borderRadius={25}>
                <HStack>
                    <Container bg="#fff" borderRadius={200} p={2}>
                        <Image
                            source={GetPenguinAvatarImage(participant.gameCharacter!.character.avatarName)}
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
                                    <Text py={1}>
                                        <Text color={GetAvatarColor(participant.inGameParticipantNumber)}
                                            fontSize={{ base: "sm", md: "md", lg: "xl" }}>
                                            {!kingCharacterMultiplier?.isKing ? participant.score : kingCharacterMultiplier.originalPoints}
                                        </Text>
                                        {kingCharacterMultiplier.isKing && <Text ml={2} color={GetAvatarColor(participant.inGameParticipantNumber)}>
                                            +{kingCharacterMultiplier.additionalPoints}
                                        </Text>}
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