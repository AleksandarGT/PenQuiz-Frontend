import { useRecoilState } from 'recoil'
//import { history } from './index';
import { authAtom } from '../state'
import { removeBackStack } from './RootNavigation'

export { useFetchWrapper }

function useFetchWrapper() {
    const [auth, setAuth] = useRecoilState(authAtom)

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    }

    function request(method: string) {

        return async (url: string, body?: any) => {

            const requestOptions: RequestInit = {
                method,

                // @ts-ignore
                headers: authHeader(),
                credentials: 'include',
            }
            if (body) {
                
                // @ts-ignore
                requestOptions.headers['Content-Type'] = 'application/json'
                requestOptions.body = JSON.stringify(body)
            }
            const response = await fetch(url, requestOptions)
            return handleResponse(response)
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

    function handleResponse(response: any): any {
        return response.text().then((text: string) => {
            const data = text && JSON.parse(text)

            if (!response.ok) {
                if ([401, 403].includes(response.status) && auth?.jwtToken) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    //localStorage.removeItem('user');
                    setAuth(null)
                    removeBackStack('Login')

                    //history.push('/login');
                }
                const error = (data && data.message && {
                    message: data.message,
                    error: data
                })

                return Promise.reject(error)
            }

            return data
        })
    }
}