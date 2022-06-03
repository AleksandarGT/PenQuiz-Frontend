import { Box, HStack, VStack } from "native-base";
import React, { useEffect } from "react";
import { ImageBackground, Platform, Text } from "react-native";
import { useRecoilState } from "recoil";
import { authAtom } from "../../state";
import { authStatusType } from "../../types/authTypes";
import AntarcticaMapSvg from "../GameMapComponents/AntarcticaMapSvg";
import { gameInstanceMock, playerAttackPossibilitiesMock } from "../GameMapComponents/CommonGameFunc";

export default function MockAntarcticaSvgMap() {
    const [auth, setAuth] = useRecoilState(authAtom)

    useEffect(() => {
        if (auth) return

        setAuth({
            id: 1,
            status: authStatusType.LOGGED,
            username: "Testing"
        })
    }, [])

    if (!auth)
        return (
            <>
                <Text>Loading</Text>
            </>
        )


    return (
        <>
            <ImageBackground source={Platform.OS === 'web' ? require('../../assets/gameBackground.svg') : require('../../assets/gameBackground.png')} resizeMode="cover" style={{
                flex: 1,
                backgroundColor: "#032157",
            }}>
                <HStack justifyContent="space-between" flexDirection="row" flex={1}>
                    <Box />
                    <VStack>

                        <AntarcticaMapSvg
                            gameMapException=""
                            onTerritoryClick={() => console.log("eh")}
                            playerAttackPossibilities={playerAttackPossibilitiesMock} gameInstance={gameInstanceMock} />

                    </VStack>
                    <Box />

                </HStack>
            </ImageBackground>
        </>
    )
}