'use client'
import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import mongodbConnect from '@/lib/mongodb'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })



export default async function RootLayout({ children, session }) {
  await mongodbConnect()

  // Get session data from pageProps (passed down from getServerSideProps)
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}> {/* Pass session from pageProps */}
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}