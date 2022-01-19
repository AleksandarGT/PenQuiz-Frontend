import { Box, Center, Container, HStack, Stack, VStack, ZStack, Text, Spacer, Button, Circle } from "native-base"
import React, { useState } from "react"
import { View, StyleSheet, ImageBackground, Platform } from 'react-native'
import { useRecoilValue } from "recoil"
import { removeBackStack } from "../../helpers"
import { AnswerMCQuestion, AnswerNumberQuestion, SelectTerritory } from "../../hooks"
import { authAtom, gameInstanceAtom, gameMapExceptionAtom, gameTimerAtom, playerAttackPossibilitiesAtom, playerQuestionAnswersAtom, roundQuestionAtom } from "../../state"
import DefaultAlert from "../Popups/DefaultAlert"
import GameEndModal from "../Popups/GameEndModal"
import AntarcticaMapSvg from './AntarcticaMapSvg'
import { gameInstanceMock, GetGameState, multipleChoiceQuestionMock, RoundAttackStage } from "./CommonGameFunc"
import GameChat from "./GameChat"
import GameBoards from "./GamePlayerBoard"
import GameRounding from "./GameRounding"
import GameTimer from "./GameTimer"
import MultipleChoiceScreen from "./MultipleChoiceScreen"
import NumberChoiceScreen from "./NumberChoiceScreen"

export default function GameMap() {
    const roundQuestion = useRecoilValue(roundQuestionAtom)
    const currentUser = useRecoilValue(authAtom)
    const gameInstance = useRecoilValue(gameInstanceAtom)
    const playerAttackPossibilities = useRecoilValue(playerAttackPossibilitiesAtom)
    const gameMapException = useRecoilValue(gameMapExceptionAtom)
    const playerQuestionAnswers = useRecoilValue(playerQuestionAnswersAtom)
    const gameTimer = useRecoilValue(gameTimerAtom)

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
                SelectTerritory(territoryName, gameTimer)
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
                    <MultipleChoiceScreen key="mcScreen1" playerQuestionAnswers={playerQuestionAnswers} AnswerMCQuestion={AnswerMCQuestion} question={roundQuestion} />
                    :
                    roundQuestion?.type == "number" ?
                        <NumberChoiceScreen key="numberScreen1" playerQuestionAnswers={playerQuestionAnswers} AnswerNumberQuestion={AnswerNumberQuestion} question={roundQuestion} />
                        :
                        <>

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
                                    {Platform.OS == "web" && <GameRounding gameInstance={gameInstance} />}



                                </VStack>
                                {
                                    GetGameState(gameInstance.gameState) == "FINISHED" &&
                                    <GameEndModal onExit={() => {
                                        removeBackStack("Home")
                                    }} gameInstance={gameInstance} />
                                }
                                <View style={{ width: "10%" }}></View>


                            </HStack>
                            {Platform.OS != "web" && <GameRounding gameInstance={gameInstance} />}
                        </>
                }


            </ImageBackground>
        </>
    )
}