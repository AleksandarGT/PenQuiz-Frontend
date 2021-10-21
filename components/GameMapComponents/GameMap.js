import { Box, Center, Container, HStack, Stack, VStack, ZStack, Text, Spacer, Button, Circle } from "native-base";
import React, { useState } from "react"
import { View, StyleSheet, ImageBackground } from 'react-native';
import AntarcticaMapSvg from './AntarcticaMapSvg'
import GamePlayerBoard from "./GamePlayerBoard";
import GameRounding from "./GameRounding";
import GameTimer from "./GameTimer";

export default function GameMap() {

    return (
        <>
            <ImageBackground source={require('../../assets/gameBackground.svg')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                <HStack justifyContent="space-between" flexDirection="row" flex={1}>
                    <VStack >
                        <Container>
                            <GamePlayerBoard participant={{
                                avatarName: "penguinAvatar",
                                score: 1231,
                                player: {
                                    username: "BoostedPenguin"
                                }
                            }} />
                            <GamePlayerBoard participant={{
                                avatarName: "penguinAvatar2",
                                score: 612,
                                player: {
                                    username: "Gosho"
                                }
                            }} hisTurn={true} />
                            <GamePlayerBoard participant={{
                                avatarName: "penguinAvatar3",
                                score: 123,
                                player: {
                                    username: "Aleksandar Todorov Is very Long"
                                }
                            }} />
                        </Container>
                        <Box mt={9} p={3} borderRadius={25} height={50} bg="#fff" width={300} style={{ flex: 1 }}>
                            <Center>
                                <Text color="black">
                                    Chat space
                                </Text>
                            </Center>

                        </Box>
                    </VStack>

                    <VStack>
                        <Center>
                            <GameTimer />
                            <AntarcticaMapSvg onTerritoryClick={(ter) => console.log(ter)} />

                        </Center>
                        <GameRounding />


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