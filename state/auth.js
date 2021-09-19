import { atom } from 'recoil';

const authAtom = atom({
    key: "auth",
    default: "",
    effects_UNSTABLE: [
        ({onSet}) => {
            onSet(newContent => {
                console.log("Updated with:")
                console.log(newContent)
            })
        }
    ]
})

export { authAtom }