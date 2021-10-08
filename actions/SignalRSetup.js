import {
    JsonHubProtocol,
    HubConnectionState,
    HubConnectionBuilder,
    LogLevel
} from '@microsoft/signalr';
import { removeBackStack } from '../helpers'


const startSignalRConnection = async connection => {
    try {
        await connection.start();
        //console.assert(connection.state === HubConnectionState.Connected);
        //console.log('SignalR connection established');
    } catch (err) {
        //console.assert(connection.state === HubConnectionState.Disconnected);
        //console.error('SignalR Connection Error: ', err);
        //setTimeout(() => startSignalRConnection(connection), 5000);
    }
};

// Set up a SignalR connection to the specified hub URL, and actionEventMap.
// actionEventMap should be an object mapping event names, to eventHandlers that will
// be dispatched with the message body.
export const setupSignalRConnection = (connectionHub, accessToken) => {
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
    connection.onclose(error => {
        removeBackStack('Home');
    });


    startSignalRConnection(connection);


    return connection;
};