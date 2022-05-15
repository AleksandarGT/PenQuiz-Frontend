import { Center, HStack, Text } from "native-base"
import React, {  } from "react"
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useRecoilValue } from "recoil"
import { gameTimerAtom } from "../../state"
import { GetGameState } from "./CommonGameFunc"

export default function GameTimer({ gameState }) {
    const displayTime = useRecoilValue(gameTimerAtom)

    function DisplayTimeFunc() {
        switch (GetGameState(gameState)) {
            case "IN_PROGRESS":
                return displayTime ? `${displayTime}s` : `Preview`
            case "FINISHED":
                return "Game Over"
            default:
                return 0
        }
    }

    return (
        <>
            <Center style={{ flex: 0.1 }}>

                <View style={{
                    minWidth: 150,
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
                                    {DisplayTimeFunc()}
                                </Text>
                            </Center>
                        </HStack>

                    </Center>

                </View>
            </Center>
        </>
    )
}