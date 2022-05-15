import { HStack } from "native-base";
import React from "react"
import { View, Platform } from 'react-native';
import { GetParticipantColor } from './CommonGameFunc'
import { AttackStage, GameInstanceResponse } from "../../types/gameInstanceTypes";

export default function GameRounding({ gameInstance }: { gameInstance: GameInstanceResponse }) {
    if (!gameInstance) {
        return null
    }


    function RenderRound() {
        switch (gameInstance.rounds.find(x => x.gameRoundNumber == gameInstance.gameRoundNumber)?.attackStage) {
            case AttackStage.MULTIPLE_NEUTRAL:

                // Rounds hold a single round question // Contain 3 territory attackers
                return (
                    <>
                        {gameInstance.rounds.filter(x => x.attackStage == AttackStage.MULTIPLE_NEUTRAL).map(round =>
                            <React.Fragment key={round.id}>
                                {round.neutralRound.territoryAttackers.map((pAttack, index) =>
                                    <View key={pAttack.id} style={[round.gameRoundNumber == gameInstance.gameRoundNumber
                                        && pAttack.attackOrderNumber == round.neutralRound.attackOrderNumber ? {

                                        // @ts-ignore
                                        outlineColor: 'rgba(6, 28, 83, 0.8)',
                                        outlineStyle: "solid",
                                        outlineWidth: 4,
                                        elevation: 5,

                                        // Outline doesn't work for mobile
                                        paddingVertical: Platform.OS != "web" ? 5 : 0,
                                        borderWidth: Platform.OS != "web" ? 4 : 0,
                                        borderColor: 'rgba(6, 28, 83, 0.8)',
                                    } : null, {
                                        minWidth: 25,
                                        flex: 1,
                                        backgroundColor: GetParticipantColor(gameInstance, pAttack.attackerId),
                                        margin: 10,
                                        minHeight: 10,
                                        alignSelf: "center",
                                        height: "20%",
                                        borderRadius: 5,
                                        marginRight: index % 3 == 2 ? 10 : 0,
                                        marginVertical: 34,
                                    }]} />
                                )}
                            </React.Fragment>
                        )}
                    </>
                )
            case AttackStage.NUMBER_NEUTRAL:
                return (
                    <>
                        {gameInstance.rounds.filter(x => x.attackStage == AttackStage.NUMBER_NEUTRAL).map(round =>
                            <View key={round.id} style={[round.gameRoundNumber == gameInstance.gameRoundNumber ? {
                                
                                // @ts-ignore
                                outlineColor: 'rgba(6, 28, 83, 0.8)',
                                outlineStyle: "solid",
                                outlineWidth: 4,
                                elevation: 5,

                                // Outline doesn't work for mobile
                                paddingVertical: Platform.OS != "web" ? 5 : 0,
                                borderWidth: Platform.OS != "web" ? 4 : 0,
                                borderColor: 'rgba(6, 28, 83, 0.8)',
                            } : null, {
                                minWidth: 25,
                                flex: 1,
                                backgroundColor: GetParticipantColor(gameInstance, round.neutralRound.territoryAttackers.find(x => x.attackerWon)?.attackerId) ?? "#032157",
                                margin: 10,
                                minHeight: 10,
                                alignSelf: "center",
                                height: "20%",
                                borderRadius: 5,
                                marginVertical: 34,
                            }]} />
                        )}
                    </>
                )

            case AttackStage.MULTIPLE_PVP:
                const NUMBER_PVP_ID = 3;

                // Rounds hold a single round question // Contain 3 territory attackers
                return (
                    <>
                        {gameInstance.rounds.filter(x => x.attackStage == AttackStage.MULTIPLE_PVP || x.attackStage == NUMBER_PVP_ID).map((round, index) =>
                            <React.Fragment key={round.id}>
                                <View key={round.pvpRound.id} style={[round.gameRoundNumber == gameInstance.gameRoundNumber ? {
                                    
                                    // @ts-ignore
                                    outlineColor: 'rgba(6, 28, 83, 0.8)',
                                    outlineStyle: "solid",
                                    outlineWidth: 4,
                                    elevation: 5,

                                    // Outline doesn't work for mobile
                                    paddingVertical: Platform.OS != "web" ? 5 : 0,
                                    borderWidth: Platform.OS != "web" ? 4 : 0,
                                    borderColor: 'rgba(6, 28, 83, 0.8)',
                                } : null, {
                                    minWidth: 25,
                                    flex: 1,
                                    backgroundColor: GetParticipantColor(gameInstance, round.pvpRound.attackerId),
                                    margin: 10,
                                    minHeight: 10,
                                    alignSelf: "center",
                                    height: "20%",
                                    borderRadius: 5,
                                    marginRight: index % 3 == 2 ? 10 : 0,
                                }]} />
                            </React.Fragment>
                        )}
                    </>
                )

            default:
                return null;
        }
    }
    return (
        <>
            <View style={{
                flex: 0.1,
                backgroundColor: "#BFD2D4",
                borderRadius: 25,
                marginHorizontal: Platform.OS == "web" ? 0 : "10%",
                justifyContent: "center",
            }}>
                {/* In case we want to make every rounding stage (4 stages total) unique
                    We'd need to make it dynamic in case we want to add stuff later
                    By receiving the whole game instance object we can do the following:
                     */}
                <HStack style={{ flex: 1 }}>
                    <RenderRound />
                </HStack>
            </View>
        </>
    )
}