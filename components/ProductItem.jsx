import React from 'react'
import EditProductButton from './EditProductButton'
import DeleteProductButton from './DeleteProductButton'

export default function ProductItem({ data, refreshProducts }) {
    return (
        <div className='p-1'>
            <div className='flex justify-center mb-2'>
                {data.imagePath && (
                    <img 
                        src={`/api/products/image/${data.imagePath}`} 
                        alt={data.productName} 
                        className='max-w-full max-h-32 object-contain'
                    />
                )}
            </div>
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
            <div className='flex justify-center mx-auto text-sm m-1'>
                <EditProductButton sku={data.productSKU} />
                <DeleteProductButton product={data} refreshProducts={refreshProducts} />
            </div>
        </div>
    )
}
