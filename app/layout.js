import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import mongodbConnect from '@/backend/lib/mongodb'
import Header from '@/components/layouts/Header'
import AuthProvider from '@/components/AuthProvider'
import { GlobalProvider } from "./GlobalProvider"

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'YokYok Fried Chicken',
  description: 'ไก่ทอดหยกๆ แซ่บๆ นัวๆ',
};

export default async function RootLayout({ children }) {
  await mongodbConnect()

  return (
    
    <html lang="en">
      <title>YFC</title>
      <body className={inter.className}>
        <div className='xl:pt-16 md:pt-18 pt-32'>
          <Header />
        </div>
        <GlobalProvider>
        <div className='xl:pt-16 md:pt-18 pt-32'>
          {children}
        </div>
        </GlobalProvider>
      </body>
    </html>
  )
}