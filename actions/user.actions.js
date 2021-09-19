import { useSetRecoilState } from 'recoil';

import {  useFetchWrapper } from '../helpers';
import { authAtom, usersAtom } from '../state';
import * as Google from 'expo-auth-session/providers/google';
import {BACKEND_API_URL} from '@env'

export { userUserActions };




function userUserActions () {
    const baseUrl = `${BACKEND_API_URL}/api/account`;
    const fetchWrapper = useFetchWrapper();
    const setAuth = useSetRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);

    const [request, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: '765711093147-j8b16iv096jprl4q92rqlrjcrb7rm0bl.apps.googleusercontent.com',
    });

    return {
        login,
        logout,
        getAll,
        googleResponse,
        googlePromptAsync,
    }


    function login(tokenId) {
        return fetchWrapper.post(`${baseUrl}/authenticate`, { TokenId: tokenId })
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                //localStorage.setItem('user', JSON.stringify(user));
                setAuth(user);

                // get return url from location state or default to home page
                //const { from } = history.location.state || { from: { pathname: '/' } };
                //history.push(from);
            });
    }

    function logout() {
        // remove user from local storage, set auth state to null and redirect to login page
        //localStorage.removeItem('user');
        setAuth(null);
        history.push('/login');
    }

    function getAll() {
        return fetchWrapper.get(baseUrl).then(setUsers);
    }    
}