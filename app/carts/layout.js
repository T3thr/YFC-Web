'use client'
import { SessionProvider } from 'next-auth/react'
import { GlobalProvider } from "@/app/GlobalProvider"

export default function Layout({children}) {
    return(
        <GlobalProvider>
        <SessionProvider>
            {children}
        </SessionProvider>
        </GlobalProvider>
    )
}