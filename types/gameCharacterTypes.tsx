export enum CharacterType {
    WIZARD,
    KING,
    VIKING
}

export enum CharacterPricingType {
    FREE,
    PREMIUM
}

export interface GameCharacterResponse {
    id: number;
    userId: number;
    gameInstanceId: number;
    characterAbilities: GameCharacterAbilities;
    character: CharacterResponse;
}

export interface CharacterResponse {
    id: number;
    characterGlobalIdentifier: string;
    name: string;
    avatarName: string;
    description: string;
    abilityDescription: string;
    pricingType: CharacterPricingType;
    characterType: CharacterType;
    price: number | null;
}


export interface GameCharacterAbilities {
    id: number;
    characterType: CharacterType;
    gameCharacterId: number;
}

export interface VikingCharacterAbilities extends GameCharacterAbilities {
    fortifyCapitalUseCount: number;
    fortifyCapitalMaxUseCount: number;
}

export interface KingCharacterAbilities extends GameCharacterAbilities {
    currentBonusPoints: number;
    pointsMultiplier: number;
}

export interface WizardCharacterAbilities extends GameCharacterAbilities {
    isMCHintsAvailable: boolean;
    mCQuestionHintUseCount: number;
    mCQuestionHintMaxUseCount: number;
}