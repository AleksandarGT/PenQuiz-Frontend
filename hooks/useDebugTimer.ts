import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import { gameTimerAtom } from "../state"

/**
 * Sets the gameTimerAtom state to the given value and 
 * decreases it's time by 1 every second until it reaches 0
 */
export default function useDebugTimer(startTime: number ) {
    const [globalDisplayTime, setGlobalDisplayTime] = useRecoilState(gameTimerAtom)

    useEffect(() => {
        console.log("Running useDebugTimer, remove this if running in production environment")
        setGlobalDisplayTime(startTime ?? 10)
    }, [])

    useEffect(() => {
        if (globalDisplayTime == 0) {
            return
        }

        setTimeout(() => {
            setGlobalDisplayTime(prev => prev - 1)
        }, 1000)
    }, [globalDisplayTime])
}