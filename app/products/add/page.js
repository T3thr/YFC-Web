'use server'
import React from 'react'
import AddProductForm from "@/components/AddProductForm"
import UploadForm from "@/components/UploadForm"
import { getAllPhotos } from '@/backend/lib/uploadActions'
import PhotoList from '@/components/PhotoList'


export default async function AddProductPage() {
  const photos = await getAllPhotos()

  return ( 
    <div>
      <AddProductForm />
      
    </div>
  )
}

