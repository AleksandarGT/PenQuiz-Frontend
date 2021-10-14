import { atom, selector } from 'recoil';

const authAtom = atom({
    key: "auth",
    default: {
        status: "LOADING"
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

const userIdSelector = selector({
    key: 'userId',
    get: ({get}) => {
        const auth = get(authAtom)
        return auth.id
    }
})

const authToken = selector({
    key: 'authToken',
    get: ({get}) => {
        const auth = get(authAtom)

        if(auth?.jwtToken) {
            return auth.jwtToken
        }
        else {
            return null
        }
    }
})


const authStatus = selector({
    key: 'authStatus',
    get: ({ get }) => {
        const auth = get(authAtom);

        if (auth?.status == 'LOADING') {
            return 'LOADING'
        }
        else if (auth) {
            return 'LOGGED'
        }
        else {
            return 'NOT_LOGGED'
        }
    },
})

export { authAtom, authStatus, authToken, userIdSelector }