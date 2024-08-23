'use client'
// อิมพอร์ต options ออบเจ็กต์ ซึ่งใช้กำหนดรูปแบบการยืนยันตัวตน
import { options } from '@/app/api/auth/[...nextauth]/options'
// อิมพอร์ตฟังก์ชัน getServerSession เพื่อรับค่า session มาใช้งานในคอมโพเนนต์
import { getServerSession } from 'next-auth'
import { useState } from 'react';
import Loading from '@/app/loading';
import Link from 'next/link';
import Title from '@/components/Title';

export default function AddProductForm() {
  const [productSKU, setProductSKU] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [message, setMessage] = useState({
    text:null,
    error:false
  });

  function clearFormData() {
    setProductName('');
    setProductSKU('');
    setPrice('');
  }

  // function เพิ่มสินค้า
  async function handleSubmit(event) {
    event.preventDefault();
    
    setIsLoading(true)
    try {
        setMessage({...message, text:'', error: false})
        
        const res = await fetch('/api/products/add', {
          method: 'POST',
          body: JSON.stringify({
            productSKU,
            productName,
            price
          })
        })
        const result = await res.json()
        if(result.error) {
          
          setMessage({...message, text: result.error, error: true})
        } else if(result.productSKU) {
          
          setMessage({...message, text:'Add Product Successfully!', error: false})
        }
        clearFormData()
    } catch (error) {
        
        setMessage({...message, text:error.message, error: true})
    } finally {
        setIsLoading(false)
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pb-24 p-2">
      <Title text="แบบฟอร์มเพิ่มสินค้า" />
      {message.text && (
        <div className={`text-center w-full max-w-xl ${message.error ? 'bg-red-200' : 'bg-green-200'} rounded-sm shadow-md p-4 my-2`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white rounded-sm shadow-md p-6">
        <label className="block mt-4">
          <span className="text-sm text-gray-600">รหัส SKU</span>
          <input
            type="text"
            required
            value={productSKU}
            onChange={(e) => setProductSKU(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3"
          />
        </label>
        <label className="block mt-4">
          <span className="text-sm text-gray-600">ชื่อสินค้า</span>
          <input
            type="text"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3"
          />
        </label>
        <label className="block mt-4">
          <span className="text-sm text-gray-600">ราคา</span>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3"
          />
        </label>
        <div className="flex justify-end mt-6">
          <Link
              href={'/products'}
              className="text-center w-24 mr-3 px-2 py-1 text-white bg-green-500 rounded-sm hover:bg-green-400 focus:outline-none active:bg-green-600"
          >
              หน้าสินค้า
          </Link>
          <button
            type="submit"
            className="px-2 py-1 text-white bg-blue-500 rounded-sm hover:bg-blue-400 focus:outline-none active:bg-blue-600"
          >
            เพิ่มสินค้า
          </button>
        </div>
      </form>
    </div>
  );
}