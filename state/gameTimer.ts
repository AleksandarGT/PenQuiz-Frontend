import { atom } from 'recoil'
export const gameTimerAtom = atom({
    key: "gameTimer",
    default: 0,
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                //  console.log("Updated with:")
                //  console.log(newContent)
            })
        }
    ]
});