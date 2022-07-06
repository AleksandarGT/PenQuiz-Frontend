import React, {  } from 'react'
import { Platform, View } from 'react-native'
import { gameTimerAtom } from '../../../state';
import { Center, HStack, Text } from 'native-base'
import { useRecoilValue } from 'recoil';
import { MaterialIcons } from '@expo/vector-icons';

export default function MCQuestionTimer() {
    const globalDisplayTime = useRecoilValue(gameTimerAtom)

    return (
        <View style={{
            justifyContent: "center",
            minWidth: Platform.OS == "web" ? 240 : 30,
            minHeight: 50,
            width: Platform.OS == "web" ? "30%" : "20%",
            backgroundColor: "#073C72",
            borderRadius: 50,
        }}>
            <Center>
                <HStack>
                    <MaterialIcons name="timer" size={32} color="white" />
                    <Text fontSize="xl" color="white" fontWeight="bold">
                        {globalDisplayTime ? `${globalDisplayTime - 1}s` : "0s"}
                    </Text>
                </HStack>
            </Center>
        </View>
    )
}