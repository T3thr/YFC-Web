import EditProductForm from '@/components/products/EditProductForm'
import React from 'react'

export default async function ProductPage({params}) {
  const {sku} = params
  return (
    <div>
        <EditProductForm sku={sku} />
    </div>
  )
}