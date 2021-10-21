import { Center, Container, HStack, Text, Image, VStack, Box, ZStack, Circle } from "native-base";
import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function GameChat() {
    return (
        <>
            <Box mt={5} p={3} borderRadius={25} height={50} bg="#fff" width={300} style={{ flex: 1 }}>
                <Center>
                    <Text color="black">
                        Chat space
                    </Text>
                </Center>
            </Box>
        </>
    )
}