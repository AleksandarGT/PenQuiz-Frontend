import React, { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { authAtom, gameInstanceAtom, gameMapExceptionAtom, gameTimerAtom, playerAttackPossibilitiesAtom, playerQuestionAnswersAtom, roundQuestionAtom } from "../state"
import { gameInstanceMock } from '../components/GameMapComponents/CommonGameFunc'

export default function useDebugGameMap() {
    const setRoundQuestion = useSetRecoilState(roundQuestionAtom)
    const setCurrentUser = useSetRecoilState(authAtom)
    const setGameInstance = useSetRecoilState(gameInstanceAtom)
    const setPlayerAttackPossibilities = useSetRecoilState(playerAttackPossibilitiesAtom)
    const setGameMapException = useSetRecoilState(gameMapExceptionAtom)
    const setPlayerQuestionAnswers = useSetRecoilState(playerQuestionAnswersAtom)
    const setGameTimer = useSetRecoilState(gameTimerAtom)

    useEffect(() => {
        setGameInstance(gameInstanceMock)
    }, [])
}