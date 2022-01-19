import { atom, selector } from 'recoil'
import { gameInstanceMock } from '../components/GameMapComponents/CommonGameFunc'
export const gameInstanceAtom = atom({
    key: "gameInstance",
    // Add default value of "" for production
    default: "",
    // default: "",
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

export const connectionStatusAtom = atom({
    key: "connectionStatus",
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