'use client'
import { useState } from 'react';
import Loading from '@/app/loading';
import Link from 'next/link';
import Title from '@/components/Title';

export default function AddProductForm() {
  const [productSKU, setProductSKU] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    text: null,
    error: false,
  });

  function clearFormData() {
    setProductName('');
    setProductSKU('');
    setPrice('');
    setImage(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!image) {
      setMessage({ text: 'Please upload an image', error: true });
      return;
    }

    setIsLoading(true);
    try {
      setMessage({ text: '', error: false });

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const imageRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const imageData = await imageRes.json();

      // Add product to database
      const res = await fetch('/api/products/add', {
        method: 'POST',
        body: JSON.stringify({
          productSKU,
          productName,
          price,
          imageUrl: imageData.secure_url, // Save the Cloudinary image URL
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();
      if (result.error) {
        setMessage({ text: result.error, error: true });
      } else if (result.productSKU) {
        setMessage({ text: 'Add Product Successfully!', error: false });
      }
      clearFormData();
    } catch (error) {
      setMessage({ text: error.message, error: true });
    } finally {
      setIsLoading(false);
    }
  }

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
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-sm shadow-md p-6">
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
            <span className="text-sm text-gray-600">อัพโหลดรูปภาพ</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-600"
            />
          </label>
        </div>
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
