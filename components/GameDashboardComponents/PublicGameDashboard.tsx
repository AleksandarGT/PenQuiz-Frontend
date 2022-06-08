import React, { } from 'react'
import { ActivityIndicator } from 'react-native'
import { Text, Center, Box, Pressable } from 'native-base'
import DefaultAlert from '../Popups/DefaultAlert'
import GameDashboardBase from './GameDashboardBase'
import { useRecoilValue } from 'recoil'
import { connectionStatusAtom, joiningGameExceptionAtom } from '../../state'
import { FindPublicMatch } from '../../hooks/useSignalR'
import { GameHubStatusCode } from '../../types/hubTypes'


function FindGameButton({ onPress }: {onPress: () => void}) {
    return (
        <Pressable onPress={onPress}>
            {({ isHovered, isFocused, isPressed }) => {
                return (
                    <Box px={9} shadow={3} bg={isPressed ? "#0D569B" : isHovered ? "#06326F" : "#071D56"} p={2} borderRadius={50}>
                        <Box px={4} pb={2} pt={2}>
                            <Text fontSize={{ base: "md", md: "lg", lg: "xl", xl: 35 }} >
                                Find Game
                            </Text>
                        </Box>
                    </Box>
                )
            }}
        </Pressable>
    )
}

export default function PublicGameDashboard() {
    const connectionStatus = useRecoilValue(connectionStatusAtom)
    const joiningGameException = useRecoilValue(joiningGameExceptionAtom)




    if (connectionStatus?.StatusCode == GameHubStatusCode.DISCONNECTED) {
        return (
            <Center flex={1}>
                <Text color="black">{connectionStatus.Error}</Text>
                <ActivityIndicator size="large" />
            </Center>
        )
    }

    return (
        <GameDashboardBase>
            <Center>
                <Text textAlign="center" color="#fff" fontSize={{ base: 40, md: 60, lg: 80, xl: 90 }} style={{ fontFamily: 'Before-Collapse', }}>
                    ConQuiz
                </Text>
                <Box px={4}>
                    <Text textAlign="center" color="#fff" fontSize={{ base: 18, md: 24, lg: 36, xl: 40 }} style={{ fontFamily: 'Before-Collapse' }}>
                        start your{"\n"}
                        adventure now
                    </Text>
                </Box>

                {joiningGameException ? (
                    <DefaultAlert message={joiningGameException} />
                ) : null}


                <FindGameButton onPress={FindPublicMatch}/>
            </Center>
        </GameDashboardBase>
    )
}