
import './globals.css'
import Product from '@/components/products/Product'

export default async function HomePage() {
  return (
    <div className='p-4 min-h-screen'>
        <Product />
    </div>
  )
}