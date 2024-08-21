import React from 'react'
import AddProductForm from "@/components/AddProductForm"
import UploadForm from "@/components/UploadForm"
import { getAllPhotos } from '@/lib/uploadActions'
import PhotoList from '@/components/PhotoList'


export default async function AddProductPage() {
  const photos = await getAllPhotos()

  return ( 
    <div>
      <AddProductForm />
      <UploadForm />
      <h1>All Photo</h1>
      <PhotoList photos={photos || []} />
    </div>
  )
}

