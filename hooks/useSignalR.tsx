import { setupSignalRConnection } from './SignalRSetup'
import { authToken, gameInstanceAtom, joiningGameExceptionAtom, connectionStatusAtom, gameTimerAtom, gameMapExceptionAtom, authAtom, roundQuestionAtom, playerQuestionAnswersAtom, playerAttackPossibilitiesAtom } from '../state'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { GAME_SERVICE_API_URL } from '../injectable'
import { IsKing, IsViking, IsWizard, removeBackStack } from '../helpers'
import { getConnection } from './SignalRSetup'
import { useEffect } from 'react'
import { IPlayerAttackPossibilities, MCPlayerQuestionAnswers, NumberPlayerQuestionAnswers, QuestionClientResponse, SelectedTerritoryResponse } from '../types/gameResponseTypes'
import { HubConnection } from '@microsoft/signalr'
import { GameHubStatusCode } from '../types/hubTypes'
import { GameInstanceResponse, GameState, ParticipantsResponse } from '../types/gameInstanceTypes'
import { IAuthData } from '../types/authTypes'
import { CharacterType, GameCharacterResponse, ScientistUseNumberHintResponse, VikingUseFortifyResponse, WizardCharacterAbilitiesResponse, WizardUseMultipleChoiceHintResponse } from '../types/gameCharacterTypes'
import { scientistHintQuestionAtom, wizardHintQuestionAtom } from '../state/character'

const connectionHub = `${GAME_SERVICE_API_URL}/gamehubs`


let connection: HubConnection | null
export function useSignalR() {
    const userJwt = useRecoilValue(authToken)
    const [currentUser, setCurrentUser] = useRecoilState(authAtom)
    const [gameInstance, setGameInstance] = useRecoilState(gameInstanceAtom)

    const setJoiningGameException = useSetRecoilState(joiningGameExceptionAtom)
    const setConnectionStatus = useSetRecoilState(connectionStatusAtom)
    const setGameTimer = useSetRecoilState(gameTimerAtom)
    const setPlayerAttackPossibilities = useSetRecoilState(playerAttackPossibilitiesAtom)
    const setGameMapException = useSetRecoilState(gameMapExceptionAtom)
    const setRoundQuestion = useSetRecoilState(roundQuestionAtom)
    const setPlayerQuestionAnswers = useSetRecoilState(playerQuestionAnswersAtom)

    const setWizardHint = useSetRecoilState(wizardHintQuestionAtom)
    const setScientistHint = useSetRecoilState(scientistHintQuestionAtom)

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

        function RemoveQuestionDataOnExit() {
            setRoundQuestion(null)
            setPlayerQuestionAnswers(null)
            setWizardHint(null)
            setScientistHint(null)
        }

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

            RemoveQuestionDataOnExit()
            setGameMapException("")
            setPlayerAttackPossibilities(null)
            setGameInstance(null)
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
            RemoveQuestionDataOnExit()
        }))

        // Game events
        connection.on('Game_Show_Main_Screen', ((msTimeForAction) => {
            removeBackStack("GameMap")
        }))

        connection.on('ShowRoundingAttacker', ((response: IPlayerAttackPossibilities) => {
            // Set the preview of available attack territories for given playerid
            setPlayerAttackPossibilities(response)



            RemoveQuestionDataOnExit()
        }))

        connection.on('BorderSelectedGameException', ((msg: string) => {
            setGameMapException(msg)
        }))

        // Question events
        connection.on('GetRoundQuestion', ((roundQuestion: QuestionClientResponse) => {
            setPlayerQuestionAnswers(null)
            
            // Remove previous hints on new question
            setWizardHint(null)
            setScientistHint(null)

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
        connection.on('GameSendCountDownSeconds', ((secondsForAction: number) => {
            setGameTimer(secondsForAction)
        }))


        // Characters
        connection.on('WizardUseMultipleChoiceHint', ((res: WizardUseMultipleChoiceHintResponse) => {

            // State only wizard data from the response
            const { answers, playerId } = res
            setWizardHint({
                answers, 
                playerId
            })

            setRoundQuestion(res.questionResponse)
        }))

        connection.on("ScientistUseNumberHint", ((res: ScientistUseNumberHintResponse) => {

            const { maxRange, minRange, playerId } = res
            setScientistHint({
                maxRange,
                minRange,
                playerId
            })

            setRoundQuestion(res.questionResponse)
        }))

        connection.on("VikingUseFortifyCapital", ((vikingRes: VikingUseFortifyResponse) => {
            setRoundQuestion(vikingRes.questionResponse)
        }))
    }
}

export function ScientistUseAbility(gameTimer: number) {
    if (gameTimer <= 0) return;
    connection?.invoke("ScientistUseAbility")
}

export function WizardUseMultipleChoiceHint(gameTimer: number) {
    if (gameTimer <= 0) return;
    connection?.invoke("WizardUseAbility")
}

export function VikingUseAbility(gameTimer: number) {
    if (gameTimer <= 0) return;
    connection?.invoke("VikingUseAbility")
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
