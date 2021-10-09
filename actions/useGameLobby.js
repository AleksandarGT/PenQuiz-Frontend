import { setupSignalRConnection } from './SignalRSetup';
import { authToken } from '../state';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { BACKEND_API_URL, GOOGLE_CLIENT_URL } from '@env'
const connectionHub = `${BACKEND_API_URL}/gamehubs`;

export function useGameLobby() {
    const userJwt = useRecoilValue(authToken)
    const [gameInstance, setGameInstance] = useState();
    const [joiningGameException, setJoiningGameException] = useState();
    const [participants, setParticipants] = useState([]);
    const [code, setCode] = useState("");
    const [isDisconnected, setIsDisconnected] = useState(false);

    
    const connection = setupSignalRConnection(connectionHub, userJwt)

    // Subscribe to isDisconnected to display loader
    connection.onreconnecting(() => {
        setIsDisconnected(true)
    })
    connection.onreconnected(() => {
        setIsDisconnected(false)
    })

    // On server event handler
    connection.on('LobbyCanceled', (() => {
        navigation.navigate('Home')
    }))
    connection.on('GetGameInstance', ((gi) => {
        setGameInstance(gi)
    }))
    connection.on('JoiningGameException', ((er) => {
        setJoiningGameException(er)
    }))
    connection.on('AllLobbyPlayers', ((e) => {
        setParticipants(e)
    }))

    // Send events to server
    function CreateGameLobby() {
        if (connection) {
            connection.invoke("CreateGameLobby")
        }
    }

    function JoinLobby() {
        if (connection) {
            connection.invoke("JoinGameLobby", code)
        }
    }

    return {connection, gameInstance, joiningGameException, participants, code, isDisconnected, CreateGameLobby, JoinLobby, setCode}
}
