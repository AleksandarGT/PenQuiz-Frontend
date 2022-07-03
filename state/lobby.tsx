import { atom } from "recoil";
import { CharacterResponse } from "../types/gameCharacterTypes";
import { GameLobbyDataResponse, ParticipantCharacter } from "../types/gameInstanceTypes";

export const gameLobbyAtom = atom<GameLobbyDataResponse | null>({
    key: "gameLobbyAtom",
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


export const gameLobbyCharactersAtom = atom<CharacterResponse[] | null>({
    key: "gameLobbyCharactersAtom",
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

export const gameLobbyParticipantCharacterAtom = atom<ParticipantCharacter[] | null>({
    key: "gameLobbyParticipantCharacterAtom",
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