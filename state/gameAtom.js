import { atom } from 'recoil'

export const gameInstanceAtom = atom({
    key: "game",
    default: "",
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                //  console.log("Updated with:")
                //  console.log(newContent)
            })
        }
    ]
  });