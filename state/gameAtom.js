import { atom } from 'recoil'

export const gameInstanceAtom = atom({
    id: "game",
    default: "",
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                 console.log("Updated with:")
                 console.log(newContent)
            })
        }
    ]
  });