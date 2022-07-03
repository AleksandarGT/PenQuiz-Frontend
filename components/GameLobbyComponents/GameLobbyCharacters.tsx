import { VStack, HStack, Box, Text, Button, Icon } from "native-base"
import React, { useEffect, useMemo } from "react"
import { ImageBackground, Platform, ScrollView, View } from "react-native"
import { useRecoilState, useRecoilValue } from "recoil"
import { LockInSelectedLobbyCharacter, SelectLobbyCharacter } from "../../hooks"
import { gameLobbyAtom, gameLobbyCharactersAtom, gameLobbyParticipantCharacterAtom } from "../../state/lobby"
import { GameLobbyDataResponse, GameLobbyParticipantCharacterStatus } from "../../types/gameInstanceTypes"
import { ChampionHeader } from "../CharacterComponents/BaseCharacterComponent"
import CharacterCard from "../CharacterComponents/CharacterCard"
import { gameCharacterResponse } from "../GameMapComponents/CommonGameFunc"
import DefaultAlert from "../Popups/DefaultAlert"
import { MaterialIcons } from '@expo/vector-icons';
import { authAtom } from "../../state"
import { CharacterPricingType } from "../../types/gameCharacterTypes"

export default function GameLobbyCharacters() {

    const lobbyData = useRecoilValue(gameLobbyAtom) as GameLobbyDataResponse
    const [gameCharacters, setGameCharacters] = useRecoilState(gameLobbyCharactersAtom)
    const participantGameCharacters = useRecoilValue(gameLobbyParticipantCharacterAtom)
    const user = useRecoilValue(authAtom)
    const charactersPerRow = 3

    // Adds each of the characters into a row by 3
    const rowedCharacters = useMemo(() => {
        if (!gameCharacters) return
        const rows = [...Array(Math.ceil(gameCharacters.length / charactersPerRow))];

        return rows.map((row, idx) => gameCharacters.slice(idx * charactersPerRow, idx * charactersPerRow + charactersPerRow))
    }, [gameCharacters])

    useEffect(() => {
        setGameCharacters(gameCharacterResponse)
    }, [])


    {/* To be considered UNAVAILABLE: */ }
    {/* 1. The given character is PREMIUM and this user does NOT own it */ }
    {/* 2. The given character is SELECTED / LOCKED by someone ELSE */ }
    function IsThisCharacterAvailable(characterId: number): boolean {
        const givenCharacter = participantGameCharacters?.find(e => e.characterId == characterId);

        // If given character is taken by someone else
        if (givenCharacter?.playerId != user?.id)
            return false

        const thisUserCharacterData = participantGameCharacters?.find(e => e.playerId == user?.id)!
        const characterType = gameCharacters?.find(e => e.id == characterId)?.pricingType

        // If this user does not own the given character id and it's as premium character
        if (characterType == CharacterPricingType.PREMIUM && !thisUserCharacterData.ownedCharacterIds.some(e => e == characterId))
            return false

        return true
    }

    const selectedCharacterId = useMemo(() => {
        return participantGameCharacters?.find(e => e.playerId == user?.id)?.characterId
    }, [user, participantGameCharacters])


    return (
        <>

            <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
                <Box flex={0.9} width="90%" minWidth="70%" bg="#071D56" p={5} borderRadius={25}>

                    {/* Characters */}
                    <VStack flex={1}>
                        <ScrollView>
                            {/* Basic champions */}
                            <Text textAlign="center" color="#fff" fontSize={{ base: 18, md: 24, lg: 36, xl: 40 }} style={{ fontFamily: 'Before-Collapse' }}>
                                Choose your champion
                            </Text>

                            {rowedCharacters?.map(itemRow =>
                                <HStack key={`${itemRow[0].avatarName ?? "first"}-stack-free`} my={3} justifyContent="space-evenly">
                                    {itemRow.map(item =>
                                        <Box key={item.avatarName} flex={0.3}>

                                            <CharacterCard selected={selectedCharacterId == item.id} unavailable={IsThisCharacterAvailable(item.id)} avatarImageName={item.avatarName} avatarName={item.name} onPress={() => {
                                                SelectLobbyCharacter(item.id)
                                            }} />
                                        </Box>
                                    )}

                                    {/* Invisible elements to keep the proportions on screen */}
                                    {itemRow.length != charactersPerRow && [...Array(charactersPerRow - itemRow.length)].map((el, i) =>
                                        <Box key={`${i}-free`} flex={0.3}>
                                            <CharacterCard invisible avatarImageName={"penguinAvatarKing"} avatarName={"penguinAvatarKing"} />
                                        </Box>
                                    )}
                                </HStack>
                            )}
                        </ScrollView>
                        <Box my={2} />
                        <Button
                            py={3}
                            _loading={{
                                bg: "#fff:alpha.100",
                            }}
                            _spinner={{
                                color: "#000"
                            }}
                            size="lg"
                            colorScheme={"cyan_bd"}
                            onPress={() => LockInSelectedLobbyCharacter()}
                            leftIcon={<Icon color="black" as={MaterialIcons} name="lock" size="sm" />}
                        >
                            <Text fontSize="md" fontWeight={"bold"} color="black">
                                Lock in
                            </Text>

                        </Button>
                    </VStack>
                </Box>
            </View>
        </>
    )
}