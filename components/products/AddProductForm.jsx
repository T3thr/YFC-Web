'use client'
import { useState } from 'react';
import Loading from '@/app/loading';
import Link from 'next/link';
import Title from '@/components/Title';
import { useSession, signOut } from 'next-auth/react';

export default function AddProductForm() {
  const { data: session } = useSession();
  const [productSKU, setProductSKU] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(1);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [message, setMessage] = useState({
    text:null,
    error:false
  });
  
  function clearFormData() {
    setProductName('')
    setProductSKU('')
    setPrice('')
    setCategory('');
    setStock(1);
  }
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
            price,
            category,
            stock,
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
  
  if(isLoading) {
    return   <Loading /> 
  }

  if (!session?.user?.role || session.user.role !== 'admin') {
    return (
      <div className='flex justify-center items-center min-w-full min-h-screen'>
        <div className='text-xl text-red-500'>Access Denied. Admins Only.</div>
      </div>
    );
  }

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pb-24 p-2">
    <Title text="แบบฟอร์มเพิ่มสินค้า" />
    { 
    
    message.text && 
    <div 
    
    className={`text-center w-full max-w-xl  ${message.error?'bg-red-200':'bg-green-200'} rounded-sm shadow-md p-4 my-2`}
    >
        {message.text}
    </div>
    }
    
    <form
    onSubmit={handleSubmit}
    className="w-full max-w-xl bg-white rounded-sm shadow-md p-6"
    >
    <div className="mt-4">
        <div className="mt-4">
        <label className="block">
            <span className="text-sm text-gray-600">รหัส SKU</span>
            
            <input
            type="text"
            required
            value={productSKU}
            onChange={(e) => setProductSKU(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </label>
        <label className="block mt-4">
            <span className="text-sm text-gray-600">ชื่อสินค้า</span>
            
            <input
            type="text"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </label>
        <label className="block mt-4">
            <span className="text-sm text-gray-600">ราคา</span>
            
            <input
            type="number"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </label>

        <label className="block mt-4">
            <span className="text-sm text-gray-600">หมวดหมู่</span>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">เลือกหมวดหมู่</option>
              <option value="เมนูแนะนำ">เมนูแนะนำ</option>
              <option value="โปรโมชัน">โปรโมชัน</option>
              <option value="ไก่ๆๆ">ไก่ๆๆ</option>
              <option value="ของทานเล่น">ของทานเล่น</option>
              <option value="เครื่องดื่ม">เครื่องดื่ม</option>
              <option value="ของสด">ของสด</option>
              <option value="ของบูด">ของบูด</option>
            </select>
          </label>

          <label className="block mt-4">
            <span className="text-sm text-gray-600">จำนวนสินค้าในสต็อก</span>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </label>
        </div>

        <div className="flex justify-end mt-6">
        <Link
            href={'/admin/products'}
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
    </div>
    </form>
</div>
  );
}
