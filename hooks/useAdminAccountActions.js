import React, { useEffect, useState } from "react"
import { useFetchWrapper } from "../helpers"
import { Platform } from 'react-native'
import { ACCOUNT_SERVICE_API_URL } from '../injectable'

export default function useAdminAccountActions(user) {
    const fetchWrapper = useFetchWrapper()
    const [serverError, setServerError] = useState()
    const [serverSuccess, setServerSuccess] = useState()

    async function banUser() {
        const baseUrl = `${ACCOUNT_SERVICE_API_URL}/api/accountadmin/ban`

        try {
            const res = await fetchWrapper.post(`${baseUrl}`, {
                AccountId: user.id
            })
            setServerSuccess(res)
            return true
        }
        catch (ex) {
            setServerError(ex?.message || "Unable to reach server")
        }
    }

    async function unBanUser() {
        const baseUrl = `${ACCOUNT_SERVICE_API_URL}/api/accountadmin/unban`

        try {
            const res = await fetchWrapper.post(`${baseUrl}`, {
                AccountId: user.id
            })
            setServerSuccess(res)
            return true
        }
        catch (ex) {
            setServerError(ex?.message || "Unable to reach server")
        }
    }


    return {
        banUser,
        unBanUser,
        serverError,
        serverSuccess
    }
}