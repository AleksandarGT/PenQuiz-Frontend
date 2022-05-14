export interface IAuthData {
    id: number | null,
    status: authStatusType,
    globalId?: string | null,
    username?: string | null,
    jwtToken?: string | null, 
}

export enum authStatusType {
    LOADING,
    LOGGED,
    NOT_LOGGED,
}

export interface AuthJWTToken {
    exp: number,
    role: string,
}