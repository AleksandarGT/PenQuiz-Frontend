import { Box, Center, Container, HStack, Stack, VStack, ZStack, Text, Spacer, Button, Circle } from "native-base";
import React, { useState } from "react"
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useRecoilValue } from "recoil";
import { useSignalR } from "../../hooks";
import { authAtom, gameInstanceAtom } from "../../state";
import DefaultAlert from "../Popups/DefaultAlert";
import AntarcticaMapSvg from './AntarcticaMapSvg'
import { gameInstanceMock, RoundAttackStage } from "./CommonGameFunc";
import GameChat from "./GameChat";
import GameBoards from "./GamePlayerBoard";
import GameRounding from "./GameRounding";
import GameTimer from "./GameTimer";

export default function GameMap() {
    const lobby = useSignalR();

    const currentUser = useRecoilValue(authAtom)
    const gameInstance = lobby.gameInstance
    const currentAttackerId = lobby.currentAttackerId
    const gameMapException = lobby.gameMapException

    // For testing purposes uncomment the lines below
    // const gameInstance = gameInstanceMock
    // const currentAttackerId = gameInstanceMock.participants[gameInstanceMock.participants.length - 2].playerId
    // const gameMapException = ""


    function OnTerritoryClick(territoryName) {
        const currentRound = gameInstance.rounds.find(x => x.gameRoundNumber == gameInstance.gameRoundNumber)
        switch (RoundAttackStage(currentRound.attackStage)) {
            case "MULTIPLE_NEUTRAL":
            case "NUMBER_NEUTRAL":

                // Check if the click was issued by a user who's turn is this one
                // If it ain't drop the request
                // const currentUserRound = currentRound.neutralRound.territoryAttackers.find(x => x.attackerId == currentUser.id)
                // if (currentUserRound.attackOrderNumber == currentRound.neutralRound.attackOrderNumber) {
                //     console.log("Its my round, so im sending my selected territory")
                //     lobby.SelectTerritory(territoryName)
                // }
                lobby.SelectTerritory(territoryName)
                break;
        }
    }

    return (
        <>
            <ImageBackground source={require('../../assets/gameBackground.svg')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                <HStack justifyContent="space-between" flexDirection="row" flex={1}>
                    <VStack >
                        <Container>
                            <GameBoards gameInstance={gameInstance} currentAttackerId={currentAttackerId} />
                        </Container>
                        <GameChat />
                    </VStack>

                    <VStack>

                        <GameTimer />
                        <AntarcticaMapSvg gameMapException={gameMapException} gameInstance={gameInstance} onTerritoryClick={(ter) => OnTerritoryClick(ter)} />
                        <GameRounding gameInstance={gameInstance} rounds={18} currentRound={8} />


                    </VStack>
                    <Box >
                        <Button colorScheme="red">
                            <Text>
                                Exit Game
                            </Text>
                        </Button>
                    </Box>

                </HStack>




            </ImageBackground>
        </>
    )
}