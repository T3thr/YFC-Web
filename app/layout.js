import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import mongodbConnect from '@/lib/mongodb'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }) {
  await mongodbConnect()

  return (
    <html lang="en">
      <title>YFC</title>
      <body className={inter.className}>
 
          <NavBar />
          {children}

      </body>
    </html>
  )
}