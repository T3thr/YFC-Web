import AllProducts from '@/components/products/AllProducts'
import PhotoList from '@/components/PhotoList'
import React from 'react'
import { getAllPhotos } from '@/backend/lib/uploadActions'


export default async function AllProductsPage() {
  const photos = await getAllPhotos()
  return (
    <div >
      <div className='flex px-3 items-start justify-center min-h-screen w-full mx-auto'>
        <AllProducts />
      </div>


    </div>
  )
}