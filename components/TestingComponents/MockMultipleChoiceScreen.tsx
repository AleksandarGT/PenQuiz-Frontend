import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { wizardHintQuestionAtom } from "../../state/character";
import { multipleChoicePvpQuestionMock, playerQuestionAnswersMock, wizardUseMultipleChoiceHintMock } from "../GameMapComponents/CommonGameFunc";
import MultipleChoiceScreen from "../GameMapComponents/MultipleChoiceScreen";

export default function MockMultipleChoiceScreen() {
    const setWizardHint = useSetRecoilState(wizardHintQuestionAtom)

    useEffect(() => {
        setWizardHint(wizardUseMultipleChoiceHintMock)
    }, [])
    return (
        <MultipleChoiceScreen playerQuestionAnswers={playerQuestionAnswersMock} question={multipleChoicePvpQuestionMock} />
    )
}