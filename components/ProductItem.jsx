import React from 'react'
import EditProductButton from './EditProductButton'
import DeleteProductButton from './DeleteProductButton'
import PhotoCard from './PhotoCard'

export default function ProductItem({data, refreshProducts}) {
  return (
<div className='p-1'>
    <div className='flex justify-between mx-auto text-sm m-1'>
        <div className='bg-gray-200 px-1 w-1/2 border border-white'>
            รหัส SKU
        </div>
        <div className='text-center w-1/2'>
        {data.productSKU}
        </div>
    </div>
    <div className='flex justify-between mx-auto text-sm m-1'>
        <div className='bg-gray-200 px-1 w-1/2 border border-white'>
            ชื่อสินค้า
        </div>
        <div className='text-center w-1/2'>
            {data.productName}
        </div>
    </div>
    <div className='flex justify-between mx-auto text-sm m-1'>
        <div className='bg-gray-200 px-1 w-1/2 border border-white'>
            ราคา
        </div>
        <div className='text-center w-1/2'>
            {data.price}
        </div>
    </div>
          {/* Display the product image */}
          {data.imageURL && (
        <div className='flex justify-center mx-auto text-sm m-1'>
                      {
                photos.map(photo => (
                    <PhotoCard key={photo?.public_id} url={photo?.secure_url} 
                    onClick={() => handleDeletePhoto(photo?.public_id)} />
                ))
            }
        </div>
      )}
    <div className='flex justify-center mx-auto text-sm m-1'>
        <EditProductButton sku={data.productSKU} />
        <DeleteProductButton product={data} refreshProducts={refreshProducts}/>
    </div>
</div>
  )
}
