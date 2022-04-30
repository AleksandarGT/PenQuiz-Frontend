import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { authAtom, gameTimerAtom } from '../../../state';
import { Box, Center, Container, HStack, Text, VStack, Image, Divider, Pressable } from 'native-base'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MaterialIcons } from '@expo/vector-icons';

export default function MCQuestionTimer() {
    const globalDisplayTime = useRecoilValue(gameTimerAtom)

    return (
        <View style={{
            justifyContent: "center",
            minWidth: 240,
            minHeight: 50,
            width: "30%",
            backgroundColor: "#073C72",
            borderRadius: 50,
        }}>
            <Center>
                <HStack>
                    <MaterialIcons name="timer" size={32} color="white" />
                    <Text fontSize="xl" color="white" fontWeight="bold">
                        {`${globalDisplayTime}s`}
                    </Text>
                </HStack>
            </Center>
        </View>
    )
}