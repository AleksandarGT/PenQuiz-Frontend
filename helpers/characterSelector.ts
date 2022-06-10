import { CharacterType, GameCharacterResponse } from "../types/gameCharacterTypes";

export function IsViking(characterResponse: GameCharacterResponse) : boolean {
    if (characterResponse.character.characterType == CharacterType.VIKING)
        return true

    return false
}

export function IsWizard(characterResponse: GameCharacterResponse) : boolean {
    if (characterResponse.character.characterType == CharacterType.WIZARD)
        return true

    return false
}

export function IsKing(characterResponse: GameCharacterResponse) : boolean {
    if (characterResponse.character.characterType == CharacterType.KING)
        return true

    return false
}