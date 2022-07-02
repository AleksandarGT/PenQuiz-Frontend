import { ScientistUseNumberHintState, WizardUseMultipleChoiceHintState } from "../types/gameCharacterTypes";
import { atom } from "recoil";


export const wizardHintQuestionAtom = atom<WizardUseMultipleChoiceHintState | null>({
    key: "wizardUseMultipleChoiceHintResponseAtom",
    default: null,
})

export const scientistHintQuestionAtom = atom<ScientistUseNumberHintState | null>({
    key: "scientistHintQuestionAtom",
    default: null,
})