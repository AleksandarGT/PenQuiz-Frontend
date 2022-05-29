import { GameCharacterResponse } from "@Types/gameCharacterTypes";
import { atom } from "recoil";

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