
export interface PaginatedQuestionsResponse {
    questions: Questions[];
    pageIndex: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    totalPages: number;
}

export enum VerificationStatus {
    UNVERIFIED,
    VERIFIED,
    REJECTED
}


export interface Answers {
    id: number;
    questionId: number;
    answer: string;
    correct: boolean;
}

export interface Questions {
    id: number;
    question: string;
    type: "multiple" | "number";
    difficulty: string;
    category: string;
    submittedByUsername: string;
    submittedAt: string | null;
    verifiedAt: string | null;
    verificationStatus: VerificationStatus;
    roundId: number;
    answers: Answers[];
}