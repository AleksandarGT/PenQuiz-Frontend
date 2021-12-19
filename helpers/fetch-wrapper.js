import { useRecoilState } from 'recoil'
//import { history } from './index';
import { authAtom } from '../state'
import { removeBackStack } from './index'

export { useFetchWrapper, }

function useFetchWrapper() {
    const [auth, setAuth] = useRecoilState(authAtom)

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    }

    function request(method) {
        return (url, body) => {
            const requestOptions = {
                method,
                headers: authHeader(),
                credentials: 'include',
            }
            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json'
                requestOptions.body = JSON.stringify(body)
            }
            return fetch(url, requestOptions).then(handleResponse)
        }
    }

    function authHeader() {
        const token = auth?.jwtToken

        const isLoggedIn = !!token

        if (isLoggedIn) {
            return { Authorization: `Bearer ${token}` }
        }
        else {
            return {}
        }
    }

    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text)

            if (!response.ok) {
                if ([401, 403].includes(response.status) && auth?.token) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    //localStorage.removeItem('user');
                    setAuth(null)
                    removeBackStack('Login')

                    //history.push('/login');
                }

                const error = (data && data.message) || response.statusText
                return Promise.reject(error)
            }

            return data
        })
    }
}