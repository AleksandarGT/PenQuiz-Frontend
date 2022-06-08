import { Audio } from "expo-av";
import React, { useState, useEffect } from "react"
import { useRecoilValue } from "recoil";
import { gameTimerAtom } from "../state";
import useSoundService from "./useSoundService";

export default function useGameSoundEffect() {

    const [tickingSound, setTickingSound] = useState<Audio.Sound>();
    const [endSound, setEndSound] = useState<Audio.Sound>();
    const displayTime = useRecoilValue(gameTimerAtom)
    const [isAudioLoaded, setIsAudioLoaded] = useState(false)

    const [startCheck, setStartCheck] = useState(false)

    const { sound, setSound } = useSoundService()

    const [isEnabled, setIsEnabled] = useState(true)


    // Perform audio cleanup on component removal
    React.useEffect(() => {
        return tickingSound
            ? () => {
                tickingSound.unloadAsync().catch(ex => {
                    //console.log("Error dismounting sound file")
                });
            }
            : undefined;
    }, [tickingSound]);

    // Perform audio cleanup on component removal
    React.useEffect(() => {
        return endSound
            ? () => {
                endSound.unloadAsync().catch(ex => {
                    //console.log("Error dismounting sound file")
                });
            }
            : undefined;
    }, [endSound]);



    // On component load load the sound files
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

        // State changes on next re-render, meanwhile we may need to update the audio instantly

        let localStartCheck: boolean = false
        // Initial load, when displaytime is 0 from previous load
        if (displayTime > 0 && !startCheck) {
            setStartCheck(true)
            localStartCheck = true
        }

        if (!isEnabled) return

        if (!isAudioLoaded || (!startCheck && !localStartCheck)) return

        // If sound setting is disabled, do not play sound effects
        if (!sound) {
            tickingSound?.stopAsync()
            endSound?.stopAsync()
            return
        }

        // If timer is 0 then play the end alarm
        if (displayTime == 0) {
            PlayEndAlarm()
            return
        }
        PlayTickingSound()


    }, [displayTime, isAudioLoaded])

    async function PlayEndAlarm() {

        if (!endSound || !tickingSound) return;

        const status = await endSound.getStatusAsync()

        if (!status.isLoaded) {
            // The end alarm is not loaded
            return
        }

        if (status.isPlaying) return

        await endSound.setVolumeAsync(0.4)


        await tickingSound.stopAsync()

        await endSound.playAsync()
    }

    async function PlayTickingSound() {
        if (!endSound || !tickingSound) return;

        const status = await tickingSound.getStatusAsync()

        if (!status.isLoaded) {
            // The end alarm is not loaded
            return
        }

        if (status.isPlaying) return

        // Song itself is 16s, max server-side timer is 12s
        //await sound.setIsLoopingAsync(true)

        await tickingSound.playAsync()
    }

    return {
        sound, setSound, setIsEnabled
    }
}