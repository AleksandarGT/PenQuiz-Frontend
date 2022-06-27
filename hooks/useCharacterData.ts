import { useEffect, useMemo, useState } from "react"
import { useFetchWrapper } from "../helpers"
import { GAME_SERVICE_API_URL } from '../injectable'
import { CharacterPricingType, CharacterResponse } from "../types/gameCharacterTypes"

export default function useCharacterData() {
    const [characters, setCharacters] = useState<CharacterResponse[]>()
    const [serverError, setServerError] = useState<string>()

    const fetchWrapper = useFetchWrapper()
    useEffect(() => {
        const baseUrl = `${GAME_SERVICE_API_URL}/api/character`

        fetchWrapper.get(baseUrl)
            .then((response: CharacterResponse[]) => {
                setCharacters(response)
            })
            .catch(er => {
                setServerError(er?.message)
            })
    }, [])

    const freeCharacters = useMemo(() => {
        return characters?.filter(e => e.pricingType == CharacterPricingType.FREE)
    }, [characters])

    const premiumCharacters = useMemo(() => {
        return characters?.filter(e => e.pricingType == CharacterPricingType.PREMIUM)
    }, [characters])

    function getCharacter(globalId: string) {
        return characters?.find(e => e.characterGlobalIdentifier == globalId)
    }

    return {
        characters,
        freeCharacters,
        premiumCharacters,
        serverError,
        getCharacter
    }
}