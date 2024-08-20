
import './globals.css'
import { Inter } from 'next/font/google'
import Product from '@/components/Product'
import UploadForm from '@/components/UploadForm'

const inter = Inter({ subsets: ["latin"] })

export default async function page() {
  return (
    <div className='p-4 min-h-screen'>
        <Product />
        <UploadForm/>
    </div>
  )
}