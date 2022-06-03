import { atom, selector } from 'recoil'
import { gameInstanceMock } from '../components/GameMapComponents/CommonGameFunc'
import { GameInstanceResponse } from '../types/gameInstanceTypes';
import { IPlayerAttackPossibilities, MCPlayerQuestionAnswers, NumberPlayerQuestionAnswers, QuestionClientResponse } from '../types/gameResponseTypes';
import { IHubConnectionStatus } from '../types/hubTypes';

export const gameInstanceAtom = atom<GameInstanceResponse | null>({
    key: "gameInstance",
    default: null,

    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                 console.log("Updated with:")
                 console.log(newContent)
            })
        }
    ]
});

export const playerAttackPossibilitiesAtom = atom<IPlayerAttackPossibilities | null>({
    key: "playerAttackPossibilities",
    default: null,

    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                 console.log("Updated with:")
                 console.log(newContent)
            })
        }
    ]
})

export const roundQuestionAtom = atom<QuestionClientResponse | null>({
    key: "roundQuestion",
    default: null,
})

export const playerQuestionAnswersAtom = atom<MCPlayerQuestionAnswers | NumberPlayerQuestionAnswers | null>({
    key: "playerQuestionAnswers",
    default: null,
})

export const joiningGameExceptionAtom = atom<string>({
    key: "joiningGameException",
    default: "",
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                // console.log("Updated with:")
                // console.log(newContent)
            })
        }
    ] 
})

export const gameMapExceptionAtom = atom<string>({
    key: "gameMapExceptionAtom",
    default: "",
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                // console.log("Updated with:")
                // console.log(newContent)
            })
        }
    ] 
})

export const participantSelector = selector({
    key: 'participantSelector',
    get: ({get}) => {
        const gameInstance = get(gameInstanceAtom)
        return gameInstance?.participants
    }
})

export const connectionStatusAtom = atom<IHubConnectionStatus | null>({
    key: "connectionStatusAtom",
    default: null,
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                // console.log("Updated with:")
                // console.log(newContent)
            })
        }
    ] 
})