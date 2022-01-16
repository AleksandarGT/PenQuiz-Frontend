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
    let connection = getConnection()

    useEffect(() => {
        if (!connection) {

            connection = setupSignalRConnection(connectionHub, userJwt)
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
        })

        // On server event handler
        // Lobby events
        connection.on('LobbyCanceled', ((msg) => {
            setJoiningGameException(msg)
            removeBackStack("Home")
        }))
        connection.on('TESTING', ((msg) => {
            console.log(msg)
        }))

        connection.on('CallerLeftGame', (() => {
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

    // Game map events
    function SelectTerritory(territoryName) {
        if (gameTimer <= 0) return;
        connection?.invoke("SelectTerritory", territoryName)
    }

    function AnswerMCQuestion(answerId) {
        if (gameTimer <= 0) return;
        connection?.invoke("AnswerQuestion", answerId)
    }

    function AnswerNumberQuestion(numberAnswer) {
        if (gameTimer <= 0) return;
        connection?.invoke("AnswerQuestion", numberAnswer)
    }

    // Send events to server
    function CreateGameLobby() {
        // Remove reference from any previous game instances
        if (gameInstance != null) {
            setGameInstance(null)
        }
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

    function FindPublicMatch() {
        // Remove reference from any previous game instances
        if (gameInstance != null) {
            setGameInstance(null)
        }
        connection?.invoke("FindPublicMatch")
    }

    return {
        // Game
        gameTimer,
        gameMapException,
        SelectTerritory,
        playerAttackPossibilities,

        // Question rounding
        roundQuestion,
        AnswerMCQuestion,
        AnswerNumberQuestion,
        playerQuestionAnswers,

        connection,
        gameInstance,
        joiningGameException,
        connectionStatus,
        CreateGameLobby,
        JoinLobby,
        LeaveGameLobby,
        StartGame,
        FindPublicMatch
    }
}
