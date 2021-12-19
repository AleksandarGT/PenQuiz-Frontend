import { Box, Center, Container, HStack, Stack, VStack, ZStack, Text, Spacer, Button, Circle } from "native-base"
import React, { useState } from "react"
import { View, StyleSheet, ImageBackground } from 'react-native'
import { useRecoilValue } from "recoil"
import { removeBackStack } from "../../helpers"
import { useSignalR } from "../../hooks"
import { authAtom, gameInstanceAtom } from "../../state"
import DefaultAlert from "../Popups/DefaultAlert"
import AntarcticaMapSvg from './AntarcticaMapSvg'
import { gameInstanceMock, GetGameState, multipleChoiceQuestionMock, RoundAttackStage } from "./CommonGameFunc"
import GameChat from "./GameChat"
import GameBoards from "./GamePlayerBoard"
import GameRounding from "./GameRounding"
import GameTimer from "./GameTimer"
import MultipleChoiceScreen from "./MultipleChoiceScreen"
import NumberChoiceScreen from "./NumberChoiceScreen"

export default function GameMap() {
    const lobby = useSignalR()
    const roundQuestion = lobby.roundQuestion
    const currentUser = useRecoilValue(authAtom)
    const gameInstance = lobby.gameInstance
    const playerAttackPossibilities = lobby.playerAttackPossibilities
    const gameMapException = lobby.gameMapException
    const AnswerMcQuestion = lobby.AnswerMCQuestion
    const AnswerNumberQuestion = lobby.AnswerNumberQuestion
    const playerQuestionAnswers = lobby.playerQuestionAnswers

    // For testing purposes uncomment the lines below
    // const gameInstance = gameInstanceMock
    // const currentAttackerId = gameInstanceMock.participants[gameInstanceMock.participants.length - 2].playerId
    // const gameMapException = ""
    // const roundQuestion = multipleChoiceQuestionMock

    function OnTerritoryClick(territoryName) {
        const currentRound = gameInstance.rounds.find(x => x.gameRoundNumber == gameInstance.gameRoundNumber)
        if (!currentUser) return
        switch (RoundAttackStage(currentRound.attackStage)) {
            case "MULTIPLE_NEUTRAL":
            case "MULTIPLE_PVP":

                // Check if the click was issued by a user who's turn is this one
                // If it ain't drop the request
                // const currentUserRound = currentRound.neutralRound.territoryAttackers.find(x => x.attackerId == currentUser.id)
                // if (currentUserRound.attackOrderNumber == currentRound.neutralRound.attackOrderNumber) {
                //     console.log("Its my round, so im sending my selected territory")
                //     lobby.SelectTerritory(territoryName)
                // }
                lobby.SelectTerritory(territoryName)
                break
        }
    }

    return (
        <>
            <ImageBackground source={require('../../assets/gameBackground.svg')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                {roundQuestion?.type == "multiple" ?
                    <MultipleChoiceScreen playerQuestionAnswers={playerQuestionAnswers} AnswerMCQuestion={AnswerMcQuestion} question={roundQuestion} />
                    :
                    roundQuestion?.type == "number" ?
                        <NumberChoiceScreen playerQuestionAnswers={playerQuestionAnswers} AnswerNumberQuestion={AnswerNumberQuestion} question={roundQuestion} />
                        :
                        <HStack justifyContent="space-between" flexDirection="row" flex={1}>
                            <VStack >
                                <Container>
                                    <GameBoards gameInstance={gameInstance} currentAttackerId={playerAttackPossibilities?.attackerId} />
                                </Container>
                                {/* <GameChat /> */}
                            </VStack>

                            <VStack>

                                <GameTimer gameState={gameInstance.gameState} />
                                <AntarcticaMapSvg
                                    gameMapException={gameMapException}
                                    gameInstance={gameInstance}
                                    onTerritoryClick={(ter) => OnTerritoryClick(ter)}
                                    playerAttackPossibilities={playerAttackPossibilities}
                                />
                                <GameRounding gameInstance={gameInstance} />


                            </VStack>
                            {
                                GetGameState(gameInstance.gameState) == "FINISHED" ? <Box>
                                    <Button onPress={() => {
                                        removeBackStack("Home")
                                    }} colorScheme="red">
                                        <Text>
                                            Exit Game
                                        </Text>
                                    </Button>
                                </Box> : <View style={{ width: "10%" }}></View>
                            }


                        </HStack>
                }



            </ImageBackground>
        </>
    )
}