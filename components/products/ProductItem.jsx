// ProductItem.jsx
import React from 'react';
import EditProductButton from './EditProductButton';
import DeleteProductButton from './DeleteProductButton';
import Link from "next/link";
import Image from "next/image";

export default function ProductItem({ data, refreshProducts }) {
  return (
    <div className='p-1'>
      <div style={{ width: "80%", height: "70%", position: "relative" , display: "flex", justifyContent: "center", alignItems: "center", margin:"auto" }}>
        <Image
          src={data?.images[0]?.secure_url || "/images/default_product.png"}
          alt={data.productName}
          className="w-full h-56 object-cover object-center"
          height="240"
          width="240"
        />
      </div>
      <div className='flex justify-between mx-auto text-sm m-1'>
        <div className='bg-gray-200 px-1 w-1/2 border border-white'>รหัส SKU</div>
        <div className='text-center ml-auto w-1/2'>{data.productSKU}</div>
      </div>
      <div className='flex justify-between mx-auto text-sm m-1'>
        <div className='bg-gray-200 px-1 w-1/2 border border-white'>ชื่อสินค้า</div>
        <div className='text-center ml-auto w-1/2'>{data.productName}</div>
      </div>
      <div className='flex justify-between mx-auto text-sm m-1'>
        <div className='bg-gray-200 px-1 w-1/2 border border-white'>ราคา</div>
        <div className='text-center ml-auto w-1/2'>{data.price}</div>
      </div>
      <div className='flex justify-between mx-auto text-sm m-1'>
        <div className='bg-gray-200 px-1 w-1/2 border border-white'>หมวดหมู่</div>
        <div className='text-center ml-auto w-1/2'>{data.category || 'ไม่ระบุ'}</div>
      </div>
      <div className='flex justify-between mx-auto text-sm m-1'>
        <div className='bg-gray-200 px-1 w-1/2 border border-white'>สต็อก</div>
        <div className='text-center ml-auto w-1/2'>{data.stock}</div>
      </div>
      <div className='flex justify-center mx-auto text-sm m-1'>
        <Link href={`/admin/products/upload/${data.productSKU}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1">
            เพิ่มรูปภาพ
          </button>
        </Link>
        <EditProductButton sku={data.productSKU} />
        <DeleteProductButton product={data} refreshProducts={refreshProducts} />
      </div>
    </div>
  );
}
