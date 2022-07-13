import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { gameLobbyAtom } from "../../state/lobby";
import { GameType } from "../../types/gameInstanceTypes";
import GameLobby from "../GameLobbyComponents/GameLobby";

export default function MockGameLobby() {

    const [gameLobbyData, setGameLobbyData] = useRecoilState(gameLobbyAtom)

    useEffect(() => {
        setGameLobbyData({
            gameCreatorId: 1,
            gameType: GameType.PUBLIC,
            invitationLink: "1231",
            participants: []
        })
    }, [])

    if(!gameLobbyData) return null

    return (
        <>
            <GameLobby />
        </>
    )
}