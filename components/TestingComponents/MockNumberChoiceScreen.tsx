import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, gameInstanceAtom } from "../../state";
import { scientistHintQuestionAtom, wizardHintQuestionAtom } from "../../state/character";
import { gameInstanceMock, multipleChoicePvpQuestionMock, numberChoiceQuestionMock, playerQuestionNumberAnswersMock, scientistResponseMock, wizardUseMultipleChoiceHintMock } from "../GameMapComponents/CommonGameFunc";
import NumberChoiceScreen from "../GameMapComponents/NumberChoiceScreen";

export default function MockNumberChoiceScreen() {
    const setWizardHint = useSetRecoilState(wizardHintQuestionAtom)
    const setScientistRes = useSetRecoilState(scientistHintQuestionAtom)
    const auth = useRecoilValue(authAtom)
    const setGameInstance = useSetRecoilState(gameInstanceAtom)

    useEffect(() => {
        //setWizardHint(wizardUseMultipleChoiceHintMock)
        setScientistRes(scientistResponseMock)
        setGameInstance(gameInstanceMock)
    }, [])

    if(!auth?.id) return null
    
    return (
        // @ts-ignore
        <NumberChoiceScreen  question={numberChoiceQuestionMock} />
    )
}