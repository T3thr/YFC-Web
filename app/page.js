
import './globals.css'
import { Inter } from 'next/font/google'
import AllProducts from '@/components/AllProducts'
import Product from '@/components/Product'

const inter = Inter({ subsets: ["latin"] })

export default async function page() {
  return (
    <div className='p-4 min-h-screen'>
        <Product />
    </div>
  )
}