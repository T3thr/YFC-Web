'use client'
import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import mongodbConnect from '@/lib/mongodb'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  mongodbConnect()

  return (
    <html lang="en">
      <title>YFC</title>
      <body className={inter.className}>
        <SessionProvider > 
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}