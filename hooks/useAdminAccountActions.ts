import { useState } from "react"
import { useFetchWrapper } from "../helpers"
import { ACCOUNT_SERVICE_API_URL } from '../injectable'

export default function useAdminAccountActions(userId: number, userGlobalId: string) {
    const fetchWrapper = useFetchWrapper()
    const [serverError, setServerError] = useState<string>()
    const [serverSuccess, setServerSuccess] = useState<string>()

    async function giftUser() {
        const baseUrl = `${ACCOUNT_SERVICE_API_URL}/api/character/gift`

        try {
            const res = await fetchWrapper.post(`${baseUrl}`, {
                UserGlobalId: userGlobalId,
            })

            setServerSuccess(res)
            return true
        }
        catch (ex: any) {
            setServerError(ex?.message || "Unable to reach server")
        }
    }

    async function banUser() {
        const baseUrl = `${ACCOUNT_SERVICE_API_URL}/api/accountadmin/ban`

        try {
            const res = await fetchWrapper.post(`${baseUrl}`, {
                AccountId: userId
            })
            setServerSuccess(res?.message || "Success")
            return true
        }
        catch (ex: any) {
            setServerError(ex?.message || "Unable to reach server")
        }
    }

    async function unBanUser() {
        const baseUrl = `${ACCOUNT_SERVICE_API_URL}/api/accountadmin/unban`

        try {
            const res: string = await fetchWrapper.post(`${baseUrl}`, {
                AccountId: userId
            })
            setServerSuccess(res)
            return true
        }
        catch (ex: any) {
            setServerError(ex?.message || "Unable to reach server")
        }
    }


    return {
        giftUser,
        banUser,
        unBanUser,
        serverError,
        serverSuccess
    }
}