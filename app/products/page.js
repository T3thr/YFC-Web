import AllProducts from '@/components/AllProducts'
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

    
        <div className='flex flex-col'>
            <h1>All Photo</h1>
            <PhotoList photos={photos || []} />
        </div>
    </div>
  )
}