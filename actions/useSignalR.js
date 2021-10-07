import { setupSignalRConnection } from './SignalRSetup';
import { authToken } from '../state';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { BACKEND_API_URL, GOOGLE_CLIENT_URL } from '@env'

const connectionHub = `${BACKEND_API_URL}/chathubs`;

export function useSignalR() {
    const userJwt = useRecoilValue(authToken)
    
    const connection = setupSignalRConnection(connectionHub, userJwt)

    return connection
}
