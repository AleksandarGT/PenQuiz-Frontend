import { useRecoilState, useSetRecoilState } from 'recoil';

import {  useFetchWrapper } from '../helpers';
import { authAtom, usersAtom } from '../state';
import * as Google from 'expo-auth-session/providers/google';
import {BACKEND_API_URL, GOOGLE_CLIENT_URL} from '@env'

export { authActions };




function authActions () {
    const baseUrl = `${BACKEND_API_URL}/api/account`;
    const fetchWrapper = useFetchWrapper();
    const setAuth = useSetRecoilState(authAtom);
    var timeout;

    function startRefreshTokenTimer(jwt) {

        // Calculate when to call refresh token refresh
        // if(auth?.jwtToken) return
        const tokenExp = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64'));
        const expires = new Date(tokenExp.exp * 1000);
        const timeoutSec = expires.getTime() - Date.now() - (60 * 1000);

        console.log(timeoutSec)

        refreshToken().then((jwt) => {
            timeout = setTimeout(() => startRefreshTokenTimer(jwt), timeoutSec);
        })
    }

    const [request, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: GOOGLE_CLIENT_URL,
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: GOOGLE_CLIENT_URL,
    });

    return {
        login,
        logout,
        googleResponse,
        googlePromptAsync,
        refreshToken,
    }


    function login(tokenId) {
        console.log(baseUrl)
        return fetchWrapper.post(`${baseUrl}/authenticate`, { TokenId: tokenId })
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('user', JSON.stringify(user));
                setAuth(user);
                startRefreshTokenTimer(user.jwtToken)
                // get return url from location state or default to home page
                //const { from } = history.location.state || { from: { pathname: '/' } };
                //history.push(from);
            });
    }

    function refreshToken() {
        return fetchWrapper.post(`${baseUrl}/refresh-token`).then(user => {
            setAuth(user);
            return user.jwtToken
        })
    }

    function logout() {
        // remove user from local storage, set auth state to null and redirect to login page
        //localStorage.removeItem('user');
        setAuth(null);
        clearInterval(timeout);
        history.push('/login');
    }
}