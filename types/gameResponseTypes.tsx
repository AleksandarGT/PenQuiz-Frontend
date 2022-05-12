import { ParticipantsResponse } from "./gameInstanceTypes";

export interface IPlayerAttackPossibilities {
    attackerId: number,
    availableAttackTerritories: string[]
}


export interface QuestionClientResponse {
    isLastQuestion: boolean;
    isNeutral: boolean;
    capitalRoundsRemaining: number | null;
    id: number;
    question: string;
    type: string;
    answers: AnswerClientResponse[];
    participants: ParticipantsResponse[];
    attackerId: number;
    defenderId: number;
}

export interface AnswerClientResponse {
    id: number;
    answer: string;
}


export interface MCPlayerQuestionAnswers {
    correctAnswerId: number;
    playerAnswers: PlayerIdAnswerId[];
}

export interface PlayerIdAnswerId {
    id: number;
    answerId: number;
}


export interface SelectedTerritoryResponse {
    gameLink: string;
    territoryId: number;
    attackedById: number;
}