import { setupSignalRConnection } from './SignalRSetup'
import { authToken, gameInstanceAtom, joiningGameExceptionAtom, connectionStatusAtom, gameTimerAtom, gameMapExceptionAtom, authAtom, roundQuestionAtom, playerQuestionAnswersAtom, playerAttackPossibilitiesAtom } from '../state'
import { useRecoilValue, useRecoilState } from 'recoil'
import { GAME_SERVICE_API_URL } from '../injectable'
import { removeBackStack } from '../helpers'
import { getConnection } from './SignalRSetup'
import { useEffect } from 'react'
import { IPlayerAttackPossibilities, MCPlayerQuestionAnswers, NumberPlayerQuestionAnswers, QuestionClientResponse, SelectedTerritoryResponse } from '../types/gameResponseTypes'
import { HubConnection } from '@microsoft/signalr'
import { GameHubStatusCode } from '../types/hubTypes'
import { GameInstanceResponse, GameState } from '../types/gameInstanceTypes'
import { IAuthData } from '../types/authTypes'

const connectionHub = `${GAME_SERVICE_API_URL}/gamehubs`


let connection: HubConnection | null
export function useSignalR() {
    const userJwt = useRecoilValue(authToken)
    const [currentUser, setCurrentUser] = useRecoilState(authAtom)
    const [gameInstance, setGameInstance] = useRecoilState(gameInstanceAtom)
    const [joiningGameException, setJoiningGameException] = useRecoilState(joiningGameExceptionAtom)
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom)
    const [gameTimer, setGameTimer] = useRecoilState(gameTimerAtom)
    const [playerAttackPossibilities, setPlayerAttackPossibilities] = useRecoilState(playerAttackPossibilitiesAtom)
    const [gameMapException, setGameMapException] = useRecoilState(gameMapExceptionAtom)
    const [roundQuestion, setRoundQuestion] = useRecoilState(roundQuestionAtom)
    const [playerQuestionAnswers, setPlayerQuestionAnswers] = useRecoilState(playerQuestionAnswersAtom)
    connection = getConnection()

    useEffect(() => {
        if (!connection) {

            if (!userJwt) {
                console.log("User JWT token is missing. Abort connection to game hub")
                return
            }

            connection = setupSignalRConnection(connectionHub, userJwt)
            setConnectionStatus({
                StatusCode: GameHubStatusCode.CONNECTED,
            })

            setupEvents()
        }
    }, [connection])

    // Prevent question service from idling while in game. Makes sure the question service will respond with questions afterwards
    function pingQuestionService() {
        if (__DEV__) return

        fetch("https://conquiz-question-api.azurewebsites.net/api/question").then(res => {
            // Question service successfully pinged
        }).catch(er => {
            console.log("Question service down: " + er)
        })
    }

    function setupEvents() {
        if (connection == null) return;

        connection.onreconnecting((error) => {
            setConnectionStatus({
                StatusCode: GameHubStatusCode.DISCONNECTED,
                Error: error?.message || "Trying to reconnect to server",
            })
        })
        connection.onreconnected(() => {
            setConnectionStatus({
                StatusCode: GameHubStatusCode.CONNECTED,
            })
        })

        connection.onclose(error => {
            setConnectionStatus({
                StatusCode: GameHubStatusCode.DISCONNECTED,
                Error: error?.message ? error.message : "Connection to the server lost. Please try again later.",
            })
        })

        // On server event handler
        // Lobby events
        connection.on('LobbyCanceled', ((msg: string) => {
            setJoiningGameException(msg)
            removeBackStack("Home")

            // Game is canceled
            if (gameInstance == null) return


            setGameInstance(old => {
                if (old == null)
                    return null

                const newValue: GameInstanceResponse = {
                    ...old,
                    gameState: GameState.CANCELED
                }

                return newValue
            })
        }))
        connection.on('TESTING', ((msg) => {
            console.log(msg)
        }))

        connection.on('CallerLeftGame', (() => {
            removeBackStack("Home")
        }))

        connection.on('GetGameUserId', ((userId) => {
            setCurrentUser(old => {

                if (old == null)
                    return null

                const newValue: IAuthData = { ...old, id: userId }

                return newValue
            })
        }))

        connection.on('PersonLeftGame', ((disconnectedPersonId: number) => {
            setGameInstance(old => {
                if (old == null)
                    return null

                const newValue: GameInstanceResponse = {
                    ...old,
                    participants: old.gameState == 0 ? old.participants.filter(
                        el => el.playerId != disconnectedPersonId) : old.participants.map(
                            y => y.playerId == disconnectedPersonId ? { ...y, isAfk: true } : y
                        )
                }

                return newValue
            })
        }))
        connection.on('NavigateToLobby', ((gi) => {
            removeBackStack("GameLobby")
        }))
        connection.on('NavigateToGame', ((gi) => {
            removeBackStack("GameMap")
        }))

        connection.on('OnSelectedTerritory', (selectedTerritoryResponse: SelectedTerritoryResponse) => {
            setGameInstance(old => {

                if (old == null)
                    return null

                const newValue: GameInstanceResponse = {
                    ...old,
                    objectTerritory: old.objectTerritory.map(
                        el => el.id === selectedTerritoryResponse.territoryId ? { ...el, attackedBy: selectedTerritoryResponse.attackedById } : el
                    )
                }



                return newValue
            })
        })
        connection.on('GetGameInstance', ((gi) => {
            setGameInstance(gi)

            pingQuestionService()
            setJoiningGameException("")
        }))
        connection.on('PlayerRejoined', ((participId: number) => {
            setGameInstance(old => {

                if (old == null)
                    return null

                const newValue: GameInstanceResponse = {
                    ...old,
                    participants: old.participants.map(
                        el => el.playerId === participId ? { ...el, isAfk: false } : el
                    )
                }

                return newValue
            })
        }))
        connection.on('GameStarting', (() => {
            removeBackStack("GameMap")
        }))
        connection.on('GameException', ((er: string) => {
            setJoiningGameException(er)
        }))

        connection.on('ShowGameMap', (() => {
            setRoundQuestion(null)
            setPlayerQuestionAnswers(null)
        }))

        // Game events
        connection.on('Game_Show_Main_Screen', ((msTimeForAction) => {
            removeBackStack("GameMap")
        }))

        connection.on('ShowRoundingAttacker', ((response: IPlayerAttackPossibilities) => {
            // Set the preview of available attack territories for given playerid
            setPlayerAttackPossibilities(response)



            setPlayerQuestionAnswers(null)
            setRoundQuestion(null)
        }))

        connection.on('BorderSelectedGameException', ((msg: string) => {
            setGameMapException(msg)
        }))

        // Question events
        connection.on('GetRoundQuestion', ((roundQuestion: QuestionClientResponse) => {
            setPlayerQuestionAnswers(null)
            setRoundQuestion(roundQuestion)
        }))

        connection.on('MCQuestionPreviewResult', ((previewResult: MCPlayerQuestionAnswers) => {
            setPlayerAttackPossibilities(null)

            setPlayerQuestionAnswers(previewResult)
            setGameMapException("")
        }))

        connection.on('NumberQuestionPreviewResult', ((previewResult: NumberPlayerQuestionAnswers) => {
            setPlayerAttackPossibilities(null)

            setPlayerQuestionAnswers(previewResult)
            setGameMapException("")
        }))

        // Timer event
        connection.on('GameSendCountDownSeconds', ((secondsForAction) => {
            setGameTimer(secondsForAction)
        }))


        // Characters
        connection.on('WizardGetAbilityUsesLeft', ((usesLeft) => {
            
        }))
    }
}

// Game map events
export function SelectTerritory(territoryName: string, gameTimer = 0) {
    if (gameTimer <= 0) return;
    connection?.invoke("SelectTerritory", territoryName)
}

export function AnswerMCQuestion(answerId: string, gameTimer = 0) {
    if (gameTimer <= 0) return;
    connection?.invoke("AnswerQuestion", answerId)
}

export function AnswerNumberQuestion(numberAnswer: string, gameTimer = 0) {
    if (gameTimer <= 0) return;
    connection?.invoke("AnswerQuestion", numberAnswer)
}

// export function RemoveGameData() {
//     gameInstance && setGameInstance(null)
//     gameTimer && setGameTimer(0)
//     playerAttackPossibilities && setPlayerAttackPossibilities(null)
//     gameMapException && setGameMapException(null)
//     roundQuestion && setRoundQuestion(null)
//     playerQuestionAnswers && setPlayerQuestionAnswers(null)
// }

// Send events to server
export function CreateGameLobby() {

    // Remove reference from any previous game instances
    //RemoveGameData()

    connection?.invoke("CreateGameLobby")
}

export function RemovePlayerFromLobby(playerId: number) {
    connection?.invoke("RemovePlayerFromLobby", playerId)
}

export function LeaveGameLobby() {
    connection?.invoke("LeaveGameLobby")
}

export function JoinLobby(code: string) {
    connection?.invoke("JoinGameLobby", code)
}

export function StartGame() {
    connection?.invoke("StartGame")
}

export function AddGameBot() {
    connection?.invoke("AddGameBot")
}

export function FindPublicMatch() {
    // Remove reference from any previous game instances
    //RemoveGameData()

    connection?.invoke("FindPublicMatch")
}
