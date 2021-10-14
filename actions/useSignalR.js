import { setupSignalRConnection } from './SignalRSetup';
import { authToken, gameInstanceAtom, joiningGameExceptionAtom, connectionStatusAtom } from '../state';
import { useRecoilValue, useRecoilState } from 'recoil';
import { BACKEND_API_URL } from '@env'
import { navigate } from '../helpers'
import { getConnection } from './SignalRSetup'

const connectionHub = `${BACKEND_API_URL}/gamehubs`;
export const StatusCode = {
    "CONNECTED": 1,
    "DISCONNECTED": 0
}
export function useSignalR() {
    const userJwt = useRecoilValue(authToken)
    const [gameInstance, setGameInstance] = useRecoilState(gameInstanceAtom);
    const [joiningGameException, setJoiningGameException] = useRecoilState(joiningGameExceptionAtom);
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom);

    
    let connection = getConnection();
    if(!connection) {
        connection = setupSignalRConnection(connectionHub ,userJwt);
    }

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
        connection.on('LobbyCanceled', (() => {
            setJoiningGameException("The owner canceled the lobby.")
            navigate("Home")
        }))
        connection.on('PersonLeft', (() => {
            navigate("Home")
        }))
        connection.on('NavigateToLobby', ((gi) => {
            navigate("GameLobby")
        }))
        connection.on('GetGameInstance', ((gi) => {
            setGameInstance(gi)
            setJoiningGameException(null)
        }))
        connection.on('GameException', ((er) => {
            setJoiningGameException(er)
        }))
        connection.on('AllLobbyPlayers', ((e) => {
            setParticipants(e)
        }))
    }

    if(connection)
        setupEvents()

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
