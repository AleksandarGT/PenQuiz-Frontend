import { setupSignalRConnection } from './SignalRSetup';
import { authToken } from '../state';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { BACKEND_API_URL, GOOGLE_CLIENT_URL } from '@env'
import { useEffect } from 'react/cjs/react.development';
const connectionHub = `${BACKEND_API_URL}/gamehubs`;

export const StatusCode = {
    "CONNECTED": 1,
    "DISCONNECTED": 0
}
export function useGameLobby() {
    const userJwt = useRecoilValue(authToken)
    const [gameInstance, setGameInstance] = useState();
    const [joiningGameException, setJoiningGameException] = useState();
    const [participants, setParticipants] = useState([]);
    const [code, setCode] = useState("");
    const [connectionStatus, setConnectionStatus] = useState({
        StatusCode: StatusCode,
        Error: {}
    });

    const [connection, setConnection] = useState();

    useEffect(() => {
        if (!connection) {
            setConnection(
                setupSignalRConnection(connectionHub, userJwt)
            )
        }
        else {
            // Subscribe to isDisconnected to display loader
            connection.onreconnecting((error) => {
                setConnectionStatus({
                    StatusCode: StatusCode.DISCONNECTED,
                    Error: error,
                })
            })
            connection.onreconnected(() => {
                setConnectionStatus({
                    StatusCode: StatusCode.CONNECTED,
                    Error: {},
                })
            })

            connection.onclose(error => {
                setConnectionStatus({
                    StatusCode: StatusCode.DISCONNECTED,
                    Error: error ? error : { message: "Connection to the server lost. Please try again later." },
                })
            });

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
        }
    }, [connection])

    useEffect(() => {
        return () => {
            console.log("Connection Cleanup")
            connection?.stop();
        }
    }, [])


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

    return { connection, gameInstance, joiningGameException, participants, code, connectionStatus, CreateGameLobby, JoinLobby, setCode }
}
