import { setupSignalRConnection } from './SignalRSetup';
import { authToken, gameInstanceAtom, joiningGameExceptionAtom, connectionStatusAtom } from '../state';
import { useRecoilValue, useRecoilState } from 'recoil';
import { BACKEND_GAME_API_URL } from '@env'
import { navigate } from '../helpers'
import { getConnection } from './SignalRSetup'
import { useEffect } from 'react';

const connectionHub = `${BACKEND_GAME_API_URL}/gamehubs`;
export const StatusCode = {
    "CONNECTED": 1,
    "DISCONNECTED": 0
}

export function useSignalR() {
    const userJwt = useRecoilValue(authToken)
    const [gameInstance, setGameInstance] = useRecoilState(gameInstanceAtom);
    const [joiningGameException, setJoiningGameException] = useRecoilState(joiningGameExceptionAtom);
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom);


    let connection = getConnection()

    useEffect(() => {
        if (!connection) {
            connection = setupSignalRConnection(connectionHub, userJwt);
            setConnectionStatus({
                StatusCode: StatusCode.CONNECTED,
                Error: null,
            })
        }


        if (connection)
            setupEvents()
    }, [])

    function setupEvents() {


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
        connection.on('LobbyCanceled', ((msg) => {
            setJoiningGameException(msg)
            navigate("Home")
        }))
        connection.on('TESTING', ((msg) => {
            console.log(msg)
        }))
        connection.on('CallerLeftGame', (() => {
            navigate("Home")
        }))
        connection.on('PersonLeftGame', ((disconnectedPersonId) => {
            setGameInstance(old => ({
                ...old,
                 participants: old.participants.map(
                     el => el.playerId === disconnectedPersonId ? {...el, isBot: true} : el
                 )
            }))
        }))
        connection.on('NavigateToLobby', ((gi) => {
            navigate("GameLobby")
        }))
        connection.on('GetGameInstance', ((gi) => {
            setGameInstance(gi)
            setJoiningGameException(null)
        }))
        connection.on('GameStarting', (() => {
            navigate("GameMap")
        }))
        connection.on('GameException', ((er) => {
            setJoiningGameException(er)
        }))
        connection.on('AllLobbyPlayers', ((e) => {
            setParticipants(e)
        }))
    }

    // Send events to server
    function CreateGameLobby() {
        connection?.invoke("CreateGameLobby")
    }

    function LeaveGameLobby() {
        connection?.invoke("LeaveGameLobby")
    }

    function JoinLobby(code) {
        connection?.invoke("JoinGameLobby", code)
    }

    function StartGame() {
        connection?.invoke("StartGame")
    }

    return { connection, gameInstance, joiningGameException, connectionStatus, CreateGameLobby, JoinLobby, LeaveGameLobby, StartGame }
}
