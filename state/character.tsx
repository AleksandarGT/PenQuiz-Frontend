import { GameCharacterResponse, VikingUseFortifyResponse, WizardUseMultipleChoiceHintResponse } from "../types/gameCharacterTypes";
import { atom } from "recoil";
import { WizardUseMultipleChoiceHint } from "../hooks";


// Obsolete
export const gameCharacterAtom = atom<GameCharacterResponse | null>({
    key: "gameCharacterAtom",
    default: null,

    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                //  console.log("Updated with:")
                //  console.log(newContent)
            })
        }
    ]
});

export const wizardHintQuestionAtom = atom<WizardUseMultipleChoiceHintResponse | null>({
    key: "wizardUseMultipleChoiceHintResponseAtom",
    default: null,
})