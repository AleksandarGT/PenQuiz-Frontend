import { atom } from 'recoil'

export const gameInstanceAtom = atom({
    key: "gameInstance",
    default: "",
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                // console.log("Updated with:")
                // console.log(newContent)
            })
        }
    ]
});

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