import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { authAtom, gameTimerAtom } from '../../state';
import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable } from 'native-base'
import { useRecoilState, useRecoilValue } from 'recoil';
import { MaterialIcons } from '@expo/vector-icons';

export default function MCQuestionTimer() {
    const globalDisplayTime = useRecoilValue(gameTimerAtom)
    const [displayTime, setDisplayTime] = useState()

    useEffect(() => {
        setDisplayTime(globalDisplayTime)

    }, [globalDisplayTime])
    useEffect(() => {
        displayTime > 0 && setTimeout(() => setDisplayTime(displayTime - 1), 1000);
    }, [displayTime])

    return (
        <View style={{
            justifyContent: "center",
            minWidth: 160,
            minHeight: 50,
            width: "30%",
            backgroundColor: "#2B4A99",
            borderRadius: 50,
        }}>
            <Center>
                <HStack>
                    <MaterialIcons name="timer" size={32} color="white" />
                    <Text fontSize="xl" fontWeight="bold">
                        {`${displayTime}s`}
                    </Text>
                </HStack>
            </Center>
        </View>
    )
}