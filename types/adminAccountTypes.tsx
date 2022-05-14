import { UsersResponse } from "./gameInstanceTypes";

export interface PaginatedAccountsResponse {
    users: UsersResponse[];
    pageIndex: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    totalPages: number;
}