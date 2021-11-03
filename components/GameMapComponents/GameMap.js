import { Box, Center, Container, HStack, Stack, VStack, ZStack, Text, Spacer, Button, Circle } from "native-base";
import React, { useState } from "react"
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useRecoilValue } from "recoil";
import { gameInstanceAtom } from "../../state";
import AntarcticaMapSvg from './AntarcticaMapSvg'
import { gameInstanceMock } from "./CommonGameFunc";
import GameChat from "./GameChat";
import GameBoards from "./GamePlayerBoard";
import GameRounding from "./GameRounding";
import GameTimer from "./GameTimer";

export default function GameMap() {
    const gameInstance = useRecoilValue(gameInstanceAtom)

    // For testing purposes uncomment the line below
    // const gameInstance = gameInstanceMock
    
    return (
        <>
            <ImageBackground source={require('../../assets/gameBackground.svg')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                <HStack justifyContent="space-between" flexDirection="row" flex={1}>
                    <VStack >
                        <Container>
                            <GameBoards gameInstance={gameInstance} />
                        </Container>
                        <GameChat />
                    </VStack>

                    <VStack>
                        <GameTimer time={25} />
                        <AntarcticaMapSvg gameInstance={gameInstance} onTerritoryClick={(ter) => console.log(ter)} />
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