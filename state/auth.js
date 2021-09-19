import { atom } from 'recoil';

const authAtom = atom({
    key: "auth",
    default: ""
})

export { authAtom }