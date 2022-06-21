import { AnswerClientResponse, QuestionClientResponse } from "./gameResponseTypes";

export enum CharacterType {
    WIZARD,
    KING,
    VIKING,
    SCIENTIST
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

// Character data
export interface GameCharacterAbilitiesResponse {
    characterType: CharacterType;
    gameCharacterId: number;
    vikingCharacterAbilitiesResponse: VikingCharacterAbilitiesResponse | null;
    kingCharacterAbilitiesResponse: KingCharacterAbilitiesResponse | null;
    wizardCharacterAbilitiesResponse: WizardCharacterAbilitiesResponse | null;
    scientistCharacterAbilitiesResponse: ScientistCharacterAbilitiesResponse | null;
}

export interface VikingCharacterAbilitiesResponse {
    fortifyCapitalUseCount: number;
    abilityUsedInRounds: number[];
    fortifyCapitalMaxUseCount: number;
}

export interface KingCharacterAbilitiesResponse {
    currentBonusPoints: number;
    pointsMultiplier: number;
}

export interface WizardCharacterAbilitiesResponse {
    mcQuestionHintUseCount: number;
    abilityUsedInRounds: number[];
    mcQuestionHintMaxUseCount: number;
}

export interface ScientistCharacterAbilitiesResponse {
    numberQuestionHintUseCount: number;
    abilityUsedInRounds: number[];
    numberQuestionHintMaxUseCount: number;
}

// Response from server
export interface WizardUseMultipleChoiceHintResponse {
    playerId: number,
    answers: AnswerClientResponse[];
    questionResponse: QuestionClientResponse;
}

// State being saved
export interface WizardUseMultipleChoiceHintState {
    answers: AnswerClientResponse[];
    playerId: number,
}

// Response from server
export interface ScientistUseNumberHintResponse {
    minRange: string;
    maxRange: string;
    questionResponse: QuestionClientResponse;
    playerId: number;
}

// State being saved
export interface ScientistUseNumberHintState {
    minRange: string;
    maxRange: string;
    playerId: number;
}


export interface VikingUseFortifyResponse {
    questionResponse: QuestionClientResponse;
    gameLink: string;
}