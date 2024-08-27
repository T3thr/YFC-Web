import React from 'react'
import EditProductButton from './EditProductButton'
import DeleteProductButton from './DeleteProductButton'
import Link from "next/link";
import StarRatings from "react-star-ratings";
import Image from "next/image";

export default function ProductItem({data, refreshProducts}) {
  return (
<div className='p-1'>
    <div
        style={{
            width: "80%",
            height: "70%",
            position: "relative",
        }}
        >
        <Image
          src={
            data?.images[0]
            ? data?.images[0].url
            : "/images/default_product.png"
        }
          alt={data.productName}
            className="w-full h-56 object-cover object-center" 
            height="240"
            width="240"
        />
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
    <div className='flex justify-between mx-auto text-sm m-1'>
                <div className='bg-gray-200 px-1 w-1/2 border border-white'>
                    หมวดหมู่
                </div>
                <div className='text-center w-1/2'>
                    {data.category || 'ไม่ระบุ'}
                </div>
            </div>
            <div className='flex justify-between mx-auto text-sm m-1'>
                <div className='bg-gray-200 px-1 w-1/2 border border-white'>
                    สต็อก
                </div>
                <div className='text-center w-1/2'>
                    {data.stock} ชิ้น
                </div>
            </div>
            
    <div className='flex justify-center mx-auto text-sm m-1'>
        <EditProductButton sku={data.productSKU} />
        <DeleteProductButton product={data} refreshProducts={refreshProducts}/>
    </div>
</div>
  )
}
