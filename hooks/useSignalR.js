import { setupSignalRConnection } from './SignalRSetup'
import { authToken, gameInstanceAtom, joiningGameExceptionAtom, connectionStatusAtom, gameTimerAtom, gameMapExceptionAtom, canUserAnswerQuestionAtom, showMultipleChoiceQuestionAtom, multipleChoiceQuestionAtom, authAtom, questionParticipantsAtom, roundQuestionAtom, playerQuestionAnswersAtom, playerAttackPossibilitiesAtom } from '../state'
import { useRecoilValue, useRecoilState } from 'recoil'
import { BACKEND_GAME_API_URL } from '@env'
import { navigate, removeBackStack } from '../helpers'
import { getConnection } from './SignalRSetup'
import { useEffect, useState } from 'react'
import { GetGameState } from '../components/GameMapComponents/CommonGameFunc'

const connectionHub = `${BACKEND_GAME_API_URL}/gamehubs`



export const StatusCode = {
    "CONNECTED": 1,
    "DISCONNECTED": 0
}



let connection
export function useSignalR() {
    const userJwt = useRecoilValue(authToken)
    const currentUser = useRecoilValue(authAtom)
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

            connection = setupSignalRConnection(connectionHub, userJwt)
            setConnectionStatus({
                StatusCode: StatusCode.CONNECTED,
                Error: null,
            })
            console.log("Setting events")

            setupEvents()
        }
    }, [connection])

    // Prevent question service from idling while in game. Makes sure the question service will respond with questions afterwards
    function pingQuestionService() {
        if(__DEV__) return

        fetch("https://conquiz-question-api.azurewebsites.net/api/question").then(res => {
            // Question service successfully pinged
        }).catch(er => {
            console.log("Question service down: " + er)
        })
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
        })

        // On server event handler
        // Lobby events
        connection.on('LobbyCanceled', ((msg) => {
            setJoiningGameException(msg)
            removeBackStack("Home")

            // Game is canceled
            if (gameInstance == null) return

            setGameInstance(old => ({
                ...old,
                gameState: 3
            }))
        }))
        connection.on('TESTING', ((msg) => {
            console.log(msg)
        }))

        connection.on('CallerLeftGame', (() => {
            console.log("I will remove backstack now from CallerLeftGame")
            removeBackStack("Home")
        }))
        connection.on('PersonLeftGame', ((disconnectedPersonId) => {
            setGameInstance(old => ({
                ...old,
                participants: old.gameState == 0 ? old.participants.filter(
                    el => el.playerId != disconnectedPersonId) : old.participants.map(
                        y => y.playerId == disconnectedPersonId ? { ...y, isBot: true } : y
                    )
            }))
        }))
        connection.on('NavigateToLobby', ((gi) => {
            console.log("I will remove backstack now from NavigateToLobby")

            removeBackStack("GameLobby")
        }))
        connection.on('NavigateToGame', ((gi) => {
            removeBackStack("GameMap")
        }))

        connection.on('OnSelectedTerritory', (selectedTerritoryResponse) => {
            setGameInstance(old => ({
                ...old,
                objectTerritory: old.objectTerritory.map(
                    el => el.id === selectedTerritoryResponse.territoryId ? { ...el, attackedBy: selectedTerritoryResponse.attackedById } : el
                )
            }))
        })
        connection.on('GetGameInstance', ((gi) => {
            setGameInstance(gi)

            pingQuestionService()
            setJoiningGameException(null)
        }))
        connection.on('PlayerRejoined', ((participId) => {
            setGameInstance(old => ({
                ...old,
                participants: old.participants.map(
                    el => el.playerId === participId ? { ...el, isBot: false } : el
                )
            }))
        }))
        connection.on('GameStarting', (() => {
            removeBackStack("GameMap")
        }))
        connection.on('GameException', ((er) => {
            setJoiningGameException(er)
        }))

        connection.on('ShowGameMap', (() => {
            setRoundQuestion("")
            setPlayerQuestionAnswers("")
        }))

        // Game events
        connection.on('Game_Show_Main_Screen', ((msTimeForAction) => {
            removeBackStack("GameMap")
        }))

        connection.on('ShowRoundingAttacker', ((attackerId, availableAttackTerritoriesNames) => {
            // Set the preview of available attack territories for given playerid

            if (currentUser.id == attackerId) {
                setPlayerAttackPossibilities({ attackerId: attackerId, availableAttackTerritories: availableAttackTerritoriesNames })
            }
            else {
                setPlayerAttackPossibilities({ attackerId: attackerId })
            }


            setPlayerQuestionAnswers("")
            setRoundQuestion("")
        }))

        connection.on('BorderSelectedGameException', ((msg) => {
            setGameMapException(msg)
        }))

        // Question events
        connection.on('GetRoundQuestion', ((roundQuestion) => {
            setPlayerQuestionAnswers("")
            setRoundQuestion(roundQuestion)
        }))

        connection.on('MCQuestionPreviewResult', ((previewResult) => {
            setPlayerAttackPossibilities("")

            setPlayerQuestionAnswers(previewResult)
            setGameMapException("")
        }))

        connection.on('NumberQuestionPreviewResult', ((previewResult) => {
            setPlayerAttackPossibilities("")

            setPlayerQuestionAnswers(previewResult)
            setGameMapException("")
        }))

        // Timer event
        connection.on('GameSendCountDownSeconds', ((secondsForAction) => {
            setGameTimer(secondsForAction)
        }))
    }
}

// Game map events
export function SelectTerritory(territoryName, gameTimer = 0) {
    if (gameTimer <= 0) return;
    connection?.invoke("SelectTerritory", territoryName)
}

export function AnswerMCQuestion(answerId, gameTimer = 0) {
    if (gameTimer <= 0) return;
    connection?.invoke("AnswerQuestion", answerId)
}

export function AnswerNumberQuestion(numberAnswer, gameTimer = 0) {
    if (gameTimer <= 0) return;
    connection?.invoke("AnswerQuestion", numberAnswer)
}

export function RemoveGameData() {
    gameInstance && setGameInstance(null)
    gameTimer && setGameTimer(0)
    playerAttackPossibilities && setPlayerAttackPossibilities(null)
    gameMapException && setGameMapException(null)
    roundQuestion && setRoundQuestion(null)
    playerQuestionAnswers && setPlayerQuestionAnswers(null)
}

// Send events to server
export function CreateGameLobby() {

    // Remove reference from any previous game instances
    //RemoveGameData()

    connection?.invoke("CreateGameLobby")
}

export function LeaveGameLobby() {
    connection?.invoke("LeaveGameLobby")
}

export function JoinLobby(code) {
    connection?.invoke("JoinGameLobby", code)
}

export function StartGame() {
    connection?.invoke("StartGame")
}

export function FindPublicMatch() {
    // Remove reference from any previous game instances
    //RemoveGameData()

    connection?.invoke("FindPublicMatch")
}
