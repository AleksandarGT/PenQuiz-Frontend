import { Center, Container, HStack, Text, Image, VStack, Box, ZStack, Circle } from "native-base";
import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function GameTimer({time}) {
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
                                    {`${time ?? 0}s`}
                                </Text>
                            </Center>
                        </HStack>

                    </Center>

                </View>
            </Center>
        </>
    )
}