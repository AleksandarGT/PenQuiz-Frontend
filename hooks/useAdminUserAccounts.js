import React, { useEffect, useState } from "react"
import { useFetchWrapper } from "../helpers"
import {Platform} from 'react-native'
import { ACCOUNT_SERVICE_API_URL } from '../injectable'

export default function useAdminUserAccounts() {
    const fetchWrapper = useFetchWrapper()

    // How much entries per fetchUser request
    const pageEntries = 2
    const [serverError, setServerError] = useState()
    const [userResponse, setuserResponse] = useState()


    const goPrevious = () => {
        if (!userResponse) return;
        fetchUsers(userResponse.pageIndex - 1)
    }

    const goNext = () => {
        if (!userResponse) return;
        fetchUsers(userResponse.pageIndex + 1)
    }

    async function fetchUsers(pageNumber) {
        const baseUrl = `${ACCOUNT_SERVICE_API_URL}/api/accountadmin?pageNumber=${pageNumber}&pageEntries=${Platform.OS == "web" ? 12 : 4}`
        const res = await fetchWrapper.get(`${baseUrl}`).catch(er => {
            setServerError(er?.message)
        })
        console.log(res)

        setuserResponse(res)
    }

    return {
        serverError,
        goPrevious,
        goNext,
        fetchUsers,
        userResponse,
    }
}