import { GameCharacterResponse } from "./gameCharacterTypes";

export enum GameType {
    PUBLIC,
    PRIVATE
}

export enum GameState {
    IN_LOBBY,
    IN_PROGRESS,
    FINISHED,
    CANCELED
}

export enum AttackStage {
    MULTIPLE_NEUTRAL,
    NUMBER_NEUTRAL,
    MULTIPLE_PVP,
    NUMBER_PVP,
    FINAL_NUMBER_PVP
}

export enum CapitalRoundAttackStage {
    MULTIPLE_CHOICE_QUESTION,
    NUMBER_QUESTION
}

export interface GameInstanceResponse {
    id: number;
    gameGlobalIdentifier: string;
    gameType: GameType;
    mapid: number;
    participantsId: number;
    gameCreatorId: number;
    gameState: GameState;
    invitationLink: string;
    gameRoundNumber: number;
    objectTerritory: ObjectTerritoryResponse[];
    participants: ParticipantsResponse[];
    rounds: RoundResponse[];
}

export interface RoundResponse {
    id: number;
    attackStage: AttackStage;
    gameInstanceId: number;
    gameRoundNumber: number;
    neutralRound: NeutralRoundResponse | null;
    pvpRound: PvpRoundResponse | null;
}

export interface AnswersResponse {
    id: number;
    questionId: number;
    answer: string;
    correct: boolean;
}

export interface PvpRoundResponse {
    id: number;
    attackerId: number;
    defenderId: number | null;
    winnerId: number | null;
    attackedTerritoryId: number | null;
    roundId: number;
    attackedTerritory: ObjectTerritoryResponse | null;
    capitalRounds: CapitalRoundResponse[];
}

export interface CapitalRoundResponse {
    id: number;
    capitalRoundAttackStage: CapitalRoundAttackStage;
    isCompleted: boolean;
    pvpRoundId: number;
    isQuestionVotingOpen: boolean;
    questionOpenedAt: string | null;
}

export interface NeutralRoundResponse {
    id: number;
    roundId: number;
    attackOrderNumber: number;
    territoryAttackers: AttackingNeutralTerritoryResponse[];
}

export interface AttackingNeutralTerritoryResponse {
    id: number;
    attackOrderNumber: number;
    attackedTerritoryId: number | null;
    answeredAt: string | null;
    attackerWon: boolean | null;
    attackerId: number;
    neutralRoundId: number;
    attackerMChoiceQAnswerId: number | null;
    attackerNumberQAnswer: number | null;
    attackedTerritory: ObjectTerritoryResponse | null;
}

export interface ParticipantsResponse {
    id: number;
    inGameParticipantNumber: number;
    avatarName: string;
    playerId: number;
    gameId: number;
    isAfk: boolean;
    score: number;
    finalQuestionScore: number;
    player: UsersResponse | null;
    gameCharacter: GameCharacterResponse | null;
}

export interface UsersResponse {
    id: number;
    isBot: boolean;
    username: string;
    userGlobalIdentifier: string | null;
}

export interface ObjectTerritoryResponse {
    id: number;
    mapTerritoryId: number;
    gameInstanceId: number;
    isCapital: boolean;
    territoryScore: number;
    takenBy: number | null;
    attackedBy: number | null;
    mapTerritory: MapTerritoryResponse | null;
}

export interface MapTerritoryResponse {
    id: number;
    territoryName: string;
}