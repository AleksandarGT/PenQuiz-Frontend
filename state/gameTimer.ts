import { atom } from 'recoil'
export const gameTimerAtom = atom<number>({
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