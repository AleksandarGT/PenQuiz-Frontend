import { UsersResponse } from "./gameInstanceTypes";

export interface PaginatedAccountsResponse {
    users: DetailedUserResponse[];
    pageIndex: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    totalPages: number;
}


export interface DetailedUserResponse {
    id: number;
    createdAt: string;
    lastLoggedAt: string;
    email: string;
    username: string;
    role: string;
    isBanned: boolean;
    bannedDate: string | null;
    provider: boolean;
    userGlobalIdentifier: string;
}