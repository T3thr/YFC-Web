import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
import mongodbConnect from '@/backend/lib/mongodb'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Yok Fried Chicken',
  description: 'ไก่ทอดหยกๆ แซ่บๆ นัวๆ',
};

export default async function RootLayout({ children }) {
  await mongodbConnect()

  return (
    <html lang="en">
      <title>YFC</title>
      <body className={inter.className}>
        <div>
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  )
}