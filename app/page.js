import Product from '@/components/Product'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return (

    <div className='flex flex-col items-center justify-center mx-auto min-h-screen p-5'>
      <Product />
    </div>

  )
}