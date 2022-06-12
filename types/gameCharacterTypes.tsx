import { AnswerClientResponse } from "./gameResponseTypes";

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
    characterAbilities: GameCharacterAbilitiesResponse;
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

export interface GameCharacterAbilitiesResponse {
    characterType: CharacterType;
    gameCharacterId: number;
    vikingCharacterAbilitiesResponse: VikingCharacterAbilitiesResponse | null;
    kingCharacterAbilitiesResponse: KingCharacterAbilitiesResponse | null;
    wizardCharacterAbilitiesResponse: WizardCharacterAbilitiesResponse | null;
}

export interface VikingCharacterAbilitiesResponse {
    fortifyCapitalUseCount: number;
    fortifyCapitalMaxUseCount: number;
}

export interface KingCharacterAbilitiesResponse {
    currentBonusPoints: number;
    pointsMultiplier: number;
}

export interface WizardCharacterAbilitiesResponse {
    mcQuestionHintUseCount: number;
    mcQuestionHintMaxUseCount: number;
}

export interface WizardUseMultipleChoiceHintResponse {
    playerId: number,
    answers: AnswerClientResponse[];
}