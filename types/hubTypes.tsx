export enum GameHubStatusCode {
    CONNECTED,
    DISCONNECTED
}

export interface IHubConnectionStatus {
    StatusCode: GameHubStatusCode,
    Error?: string,
}