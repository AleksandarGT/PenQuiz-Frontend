import { atom, selector } from 'recoil';
import { authStatusType, IAuthData } from '../types/authTypes';


const authAtom = atom<IAuthData | null>({
    key: "auth",
    default: {
        id: null,
        status: authStatusType.LOADING,
    },
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(newContent => {
                // console.log("Updated with:")
                // console.log(newContent)
            })
        }
    ]
})


const authToken = selector({
    key: 'authToken',
    get: ({get}) => {
        const auth = get(authAtom)

        return auth?.jwtToken ? auth.jwtToken : null
    }
})


const authStatus = selector({
    key: 'authStatus',
    get: ({ get }) => {
        const auth = get(authAtom);

        if(auth?.status == authStatusType.LOADING) return auth.status

        if(auth) return authStatusType.LOGGED

        return authStatusType.NOT_LOGGED
    },
})

const userIdSelector = selector({
    key: 'userId',
    get: ({get}) => {
        const auth = get(authAtom)
        return auth.id
    }
})

export { authAtom, authStatus, authToken, userIdSelector }