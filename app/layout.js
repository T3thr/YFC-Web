import NavBar from '@/components/NavBar'
import Product from '@/components/Product'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'YFC',
  description: 'ไก่ทอดหยก หยก แซ่บๆ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}