import React, { useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useSoundService() {
    const [sound, setSound] = useState()

    useEffect(() => {
        getGlobalSoundEffects().then(ex => {
            
            // Default value 
            if (ex == undefined) {
                setSound(true)
                return
            }

            setSound(ex == "true" ? true : false)
        })
    }, [])

    useEffect(() => {
        if (sound == undefined) return

        setGlobalSoundEffects(JSON.stringify(sound))
    }, [sound])


    async function setGlobalSoundEffects(state) {
        await AsyncStorage.setItem("globalSoundEffects", state).catch(ex => {
            console.log(ex)
        })

        return state
    }

    async function getGlobalSoundEffects() {
        const value = await AsyncStorage.getItem('globalSoundEffects')
        return value
    }

    return {
        sound, setSound
    }
}