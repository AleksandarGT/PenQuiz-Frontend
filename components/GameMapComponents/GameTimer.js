import { Center, Container, HStack, Text, Image, VStack, Box, ZStack, Circle } from "native-base";
import React, { useEffect, useState } from "react"
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRecoilState } from "recoil";
import { gameTimerAtom } from "../../state";

export default function GameTimer() {
    const [displayTime, setDisplayTime] = useRecoilState(gameTimerAtom)

    useEffect(() => {
        // Update the display time value
        const updatingTimeInterval = setInterval(() => {
            setDisplayTime((prevValue) => {
                if(prevValue <= 1) {
                    clearInterval(updatingTimeInterval)
                    return 0;
                }
                return prevValue - 1
            })
        }, 1000)

        return () => clearInterval(updatingTimeInterval)


    }, [displayTime])

    return (
        <>
            <Center style={{ flex: 1 }}>

                <View style={{
                    justifyContent: "center",
                    flex: 0.5,
                    minWidth: 80,
                    width: "20%",
                    backgroundColor: "#A91C1C",
                    borderRadius: 10,
                    justifyContent: "center"
                }}>
                    <Center>
                        <HStack>
                            <MaterialIcons name="timer" size={32} color="white" />

                            <Center>
                                <Text fontSize="xl" fontWeight="bold">
                                    {displayTime ? `${displayTime}s` : `Preview`}
                                </Text>
                            </Center>
                        </HStack>

                    </Center>

                </View>
            </Center>
        </>
    )
}