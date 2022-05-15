import { Center, Container, HStack, VStack, IconButton } from "native-base"
import React, { useEffect } from "react"
import { View, ImageBackground, Platform } from 'react-native'
import { useRecoilValue } from "recoil"
import { removeBackStack } from "../../helpers"
import { SelectTerritory } from "../../hooks"
import { authAtom, gameInstanceAtom, gameMapExceptionAtom, gameTimerAtom, playerAttackPossibilitiesAtom, playerQuestionAnswersAtom, roundQuestionAtom } from "../../state"
import GameEndModal from "../Popups/GameEndModal"
import AntarcticaMapSvg from './AntarcticaMapSvg'
import { GetGameState } from "./CommonGameFunc"
import GameBoards from "./GamePlayerBoard"
import GameRounding from "./GameRounding"
import GameTimer from "./GameTimer"
import MultipleChoiceScreen from "./MultipleChoiceScreen"
import NumberChoiceScreen from "./NumberChoiceScreen"
import { Ionicons } from '@expo/vector-icons'
import useGameSoundEffect from "../../hooks/useGameSoundEffect"
import { AttackStage } from "../../types/gameInstanceTypes"
import { MCPlayerQuestionAnswers, NumberPlayerQuestionAnswers } from "../../types/gameResponseTypes"

export default function GameMap() {
    const roundQuestion = useRecoilValue(roundQuestionAtom)
    const currentUser = useRecoilValue(authAtom)
    const gameInstance = useRecoilValue(gameInstanceAtom)
    const playerAttackPossibilities = useRecoilValue(playerAttackPossibilitiesAtom)
    const gameMapException = useRecoilValue(gameMapExceptionAtom)
    const playerQuestionAnswers = useRecoilValue(playerQuestionAnswersAtom)
    const gameTimer = useRecoilValue(gameTimerAtom)
    const { sound, setSound, setIsEnabled } = useGameSoundEffect()


    useEffect(() => {
        setIsEnabled(playerAttackPossibilities?.attackerId == currentUser.id ? true : false)
    }, [playerAttackPossibilities])

    function OnTerritoryClick(territoryName: string) {
        const currentRound = gameInstance.rounds.find(x => x.gameRoundNumber == gameInstance.gameRoundNumber)
        if (!currentUser) return

        switch (currentRound.attackStage) {
            case AttackStage.MULTIPLE_NEUTRAL:
            case AttackStage.MULTIPLE_PVP:
                SelectTerritory(territoryName, gameTimer)
                break;
        }
    }

    return (
        <>
            <ImageBackground source={Platform.OS === 'web' ? require('../../assets/gameBackground.svg') : require('../../assets/gameBackground.png')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                {roundQuestion?.type == "multiple" ?
                    <MultipleChoiceScreen key="mcScreen1" playerQuestionAnswers={playerQuestionAnswers as MCPlayerQuestionAnswers} question={roundQuestion} />
                    :
                    roundQuestion?.type == "number" ?
                        <NumberChoiceScreen key="numberScreen1" playerQuestionAnswers={playerQuestionAnswers as NumberPlayerQuestionAnswers} question={roundQuestion} />
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
                                <View style={{ width: "10%", alignItems: "flex-end" }}>
                                    <Center>
                                        <IconButton
                                            onPress={() => {
                                                setSound(!sound)
                                            }}
                                            size="md"
                                            mt={2}
                                            mr={2}
                                            variant="outline"
                                            _icon={{
                                                as: Ionicons,
                                                name: sound ? "volume-medium" : "volume-mute", // volume-medium // volume-mute
                                                color: "white"
                                            }}
                                        />
                                    </Center>
                                </View>

                            </HStack>
                            {Platform.OS != "web" && <GameRounding gameInstance={gameInstance} />}
                        </>
                }


            </ImageBackground>
        </>
    )
}