import { atom, selector } from 'recoil';

const authAtom = atom({
    key: "auth",
    default: "",
    effects_UNSTABLE: [
        ({onSet}) => {
            onSet(newContent => {
                // console.log("Updated with:")
                // console.log(newContent)
            })
        }
    ]
})


const authStatus = selector({
    key: 'authStatus',
    get: ({get}) => {
        const auth = get(authAtom);

        if(auth?.status == 'LOADING') {
            return 'LOADING'
        }
        else if(auth) {
            return 'LOGGED'
        }
        else {
            return 'NOT_LOGGED'
        }
    },
})

export { authAtom, authStatus }