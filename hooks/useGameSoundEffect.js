import { Audio } from "expo-av";
import React, { useState, useEffect } from "react"
import { useRecoilValue } from "recoil";
import { gameTimerAtom } from "../state";

export default function useGameSoundEffect() {

    const [tickingSound, setTickingSound] = useState();
    const [endSound, setEndSound] = useState();
    const displayTime = useRecoilValue(gameTimerAtom)
    const [isAudioLoaded, setIsAudioLoaded] = useState(false)

    useEffect(() => {
        asyncLoadSoundFiles()
    }, [])

    async function asyncLoadSoundFiles() {
        setTickingSound((await Audio.Sound.createAsync(
            require('./../assets/clock-ticking-3.wav')
        )).sound)

        setEndSound((await Audio.Sound.createAsync(
            require('./../assets/clock-end.wav')
        )).sound)

        setIsAudioLoaded(true)
    } 

    useEffect(() => {
        if (!isAudioLoaded) return

        // If timer is 0 then play the end alarm
        if (displayTime == 0) {
            PlayEndAlarm()
            return
        }
        PlayTickingSound()

    }, [displayTime, isAudioLoaded])

    async function PlayEndAlarm() {

        const status = await endSound.getStatusAsync()
        
        if (status.isPlaying) return

        await endSound.setVolumeAsync(0.4)

        await tickingSound.stopAsync()

        await endSound.playAsync()
    }

    async function PlayTickingSound() {

        const status = await tickingSound.getStatusAsync()

        if (status.isPlaying) return

        // Song itself is 16s, max server-side timer is 12s
        //await sound.setIsLoopingAsync(true)

        await tickingSound.playAsync()
    }
}