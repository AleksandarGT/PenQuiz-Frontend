import { Box, HStack, VStack } from "native-base";
import React, { useEffect } from "react";
import { ImageBackground, Platform, Text } from "react-native";
import { useRecoilState } from "recoil";
import { authAtom, gameInstanceAtom } from "../../state";
import { authStatusType } from "../../types/authTypes";
import AntarcticaMapSvg from "../GameMapComponents/AntarcticaMapSvg";
import { gameInstanceMock, playerAttackPossibilitiesMock } from "../GameMapComponents/CommonGameFunc";
import GameMap from "../GameMapComponents/GameMap";

export default function MockGameMap() {
    const [auth, setAuth] = useRecoilState(authAtom)
    const [gm, setGm] = useRecoilState(gameInstanceAtom)

    useEffect(() => {
        if (auth) return

        setAuth({
            id: 1,
            status: authStatusType.LOGGED,
            username: "Testing"
        })
    }, [])

    useEffect(() => {
        if (gm) return

        setGm(gameInstanceMock)
    }, [])

    if (!auth || !gm)
        return (
            <>
                <Text>Loading</Text>
            </>
        )


    return (
        <>
            <GameMap />
        </>
    )
}