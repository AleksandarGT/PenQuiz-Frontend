import { Center, Container, HStack, Text, Image, VStack, Box, ZStack } from "native-base";
import React, { useState } from "react"
import { View, StyleSheet, Platform } from 'react-native';
import { GetParticipantColor, RoundAttackStage, gameInstanceMock } from './CommonGameFunc'
import { useRecoilValue } from 'recoil'
import { gameInstanceAtom } from '../../state'

export default function GameRounding({ gameInstance = gameInstanceMock }) {
    if (!gameInstance) {
        return null
    }


    function RenderRound() {
        let ENUM_ID
        switch (RoundAttackStage(gameInstance.rounds.find(x => x.gameRoundNumber == gameInstance.gameRoundNumber)?.attackStage)) {
            case "MULTIPLE_NEUTRAL":
                ENUM_ID = 0;

                // Rounds hold a single round question // Contain 3 territory attackers
                return (
                    <>
                        {gameInstance.rounds.filter(x => x.attackStage == ENUM_ID).map(round =>
                            <React.Fragment key={round.id}>
                                {round.neutralRound.territoryAttackers.map((pAttack, index) =>
                                    <View key={pAttack.id} style={[round.gameRoundNumber == gameInstance.gameRoundNumber
                                        && pAttack.attackOrderNumber == round.neutralRound.attackOrderNumber ? {
                                        outlineColor: 'rgba(6, 28, 83, 0.8)',
                                        outlineStyle: "solid",
                                        outlineWidth: 4,
                                        elevation: 5,
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
            case "NUMBER_NEUTRAL":
                ENUM_ID = 1;

                return (
                    <>
                        {gameInstance.rounds.filter(x => x.attackStage == ENUM_ID).map(round =>
                            <View key={round.id} style={[round.gameRoundNumber == gameInstance.gameRoundNumber ? {
                                outlineColor: 'rgba(6, 28, 83, 0.8)',
                                outlineStyle: "solid",
                                outlineWidth: 4,
                                elevation: 5,
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

            case "MULTIPLE_PVP":
                ENUM_ID = 2;
                const NUMBER_PVP_ID = 3;

                // Rounds hold a single round question // Contain 3 territory attackers
                return (
                    <>
                        {gameInstance.rounds.filter(x => x.attackStage == ENUM_ID || x.attackStage == NUMBER_PVP_ID).map((round, index) =>
                            <React.Fragment key={round.id}>
                                <View key={round.pvpRound.id} style={[round.gameRoundNumber == gameInstance.gameRoundNumber ? {
                                    outlineColor: 'rgba(6, 28, 83, 0.8)',
                                    outlineStyle: "solid",
                                    outlineWidth: 4,
                                    elevation: 5,
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