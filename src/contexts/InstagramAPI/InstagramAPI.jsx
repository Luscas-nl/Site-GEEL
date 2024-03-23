// ApiContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'

const ApiContext = createContext()

export function ApiProvider({ children }) {
    const [posts, setPosts] = useState(null)

    const fetchData = async () => {
        const token = "IGQWRQc2dTMFhwWEVublBTOEUzY1g4Y2hMR3lKSkNsbjZAHYjNlOXMwMElQYTd0b1hnSUpiSnVKT19tbk5ESlZATSDl1V1dfQ3pOMzNvdnBnREVibTdmMVBqRW1GYzgtZAEdrVVE0NWotLWV6bkx3b04zWmV6bTBhdUEZD";
        const basicUrl = `https://graph.instagram.com/me/media?fields=caption,id,media_type,timestamp,thumbnail_url,media_url&access_token=${token}`;

        try {
            const response = await fetch(basicUrl)
            const data = await response.json()
            setPosts(data)
            sessionStorage.setItem('@Instagram:Posts', JSON.stringify(data))
        } catch (error) {
            console.error("Erro na solicitação:", error)
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (!posts) {
            const storedData = sessionStorage.getItem('@Instagram:Posts')
            if (storedData) {
                setPosts(JSON.parse(storedData));
            } else {
                fetchData()
            }
        }
    }, [posts])

    return (
        <ApiContext.Provider value={{ posts, fetchData }}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi(){
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider')
    }
    return context
}
