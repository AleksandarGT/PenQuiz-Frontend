import { Center, Container, HStack, Text, Image, VStack, Box, ZStack } from "native-base";
import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import { GetParticipantColor, gameInstanceMock } from './CommonGameFunc'
import { useRecoilValue } from 'recoil'
import { gameInstanceAtom } from '../../state'

export default function GameRounding() {
    const gameInstance = gameInstanceMock //useRecoilValue(gameInstanceAtom)
    if(!gameInstance) {
        return null
    }
    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: "#BFD2D4",
                borderRadius: 25,
                justifyContent: "center",
            }}>
                <HStack style={{ flex: 1 }}>
                    {gameInstance.rounds.filter(x => !x.isLastUntakenTerritories).map((x, index) =>
                        <View key={x.id} style={[x.gameRoundNumber == gameInstance.gameRoundNumber ? {
                            // This probably won't work on mobile, fix there
                            outlineColor: 'rgba(6, 28, 83, 0.8)',
                            outlineStyle: "solid",
                            outlineWidth: 4,
                            elevation: 5,
                        } : null, {
                            flex: 1,
                            backgroundColor: GetParticipantColor(gameInstance, x.attackerId),
                            margin: 10,
                            borderRadius: 5,
                            marginRight: index % 3 == 2 ? 10 : 0,
                            marginVertical: 34,

                        }]} />
                    )}

                </HStack>

            </View>
        </>
    )
}