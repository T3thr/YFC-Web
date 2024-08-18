import EditProductForm from '@/components/EditProductForm'
import React from 'react'

export default async function ProductPage({params}) {
  const {sku} = params
  return (
    <div>
        <EditProductForm sku={sku} />
    </div>
  )
}