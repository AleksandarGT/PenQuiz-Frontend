import { atom, selector } from 'recoil'
import { gameInstanceMock } from '../components/GameMapComponents/CommonGameFunc'
import { GameInstanceResponse } from '../types/gameInstanceTypes';

export const gameInstanceAtom = atom<GameInstanceResponse | null>({
    key: "gameInstance",
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

export const playerAttackPossibilitiesAtom = atom({
    key: "playerAttackPossibilities",
    default: "",
})

export const roundQuestionAtom = atom({
    key: "roundQuestion",
    default: "",
})

export const playerQuestionAnswersAtom = atom({
    key: "playerQuestionAnswers",
    default: "",
})

export const joiningGameExceptionAtom = atom({
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

export const gameMapExceptionAtom = atom({
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
        return gameInstance.participants
    }
})

export const connectionStatusAtom = atom({
    key: "connectionStatusAtom",
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