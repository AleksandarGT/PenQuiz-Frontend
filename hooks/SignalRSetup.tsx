import {
    JsonHubProtocol,
    HubConnectionState,
    HubConnectionBuilder,
    LogLevel,
    HubConnection
} from '@microsoft/signalr';
let client: HubConnection | null;

const startSignalRConnection = async (connection: HubConnection) => {
    try {
        await connection.start();
    } catch (err) {
        //console.assert(connection.state === HubConnectionState.Disconnected);
        //console.error('SignalR Connection Error: ', err);
        //setTimeout(() => startSignalRConnection(connection), 5000);
    }
};

// Set up a SignalR connection to the specified hub URL, and actionEventMap.
// actionEventMap should be an object mapping event names, to eventHandlers that will
// be dispatched with the message body.
export const setupSignalRConnection = (connectionHub: string, accessToken: string) => {
    const options = {
        logMessageContent: true,
        logger: LogLevel.Warning,
        accessTokenFactory: () => accessToken,
    };


    // create the connection instance
    // withAutomaticReconnect will automatically try to reconnect
    // and generate a new socket connection if needed
    const connection = new HubConnectionBuilder()
        .withUrl(connectionHub, options)
        .withAutomaticReconnect()
        .withHubProtocol(new JsonHubProtocol())
        .configureLogging(LogLevel.Information)
        .build();

    connection.serverTimeoutInMilliseconds = 60000;

    // re-establish the connection if connection dropped



    startSignalRConnection(connection);

    client = connection;
    return connection;
};

export const getConnection = () => {
    return client
}

export async function closeConnection() {
    await client?.stop()
    client = null;
}