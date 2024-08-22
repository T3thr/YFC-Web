'use client'
import { useRef, useState } from 'react';
import Loading from '@/app/loading';
import Link from 'next/link';
import Title from '@/components/Title';
import PhotoCard from './PhotoCard';
import ButtonSubmit from './ButtonSubmit';

export default function AddProductForm() {
  const [productSKU, setProductSKU] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  
  const formRef = useRef();
  const [files, setFiles] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: null, error: false });

  function clearFormData() {
    setProductName('');
    setProductSKU('');
    setPrice('');
    setFiles([]);
  }
  // function เงื่อนไขรูป
  async function handleInputFiles(e) {
    const files = e.target.files;
    const maxFiles = 1;

    // ตรวจสอบว่าไฟล์ที่อัพโหลดเกินลิมิตไหม
    if (files.length > maxFiles) {
        setErrorMessage(`Error: You can upload up to ${maxFiles} images.`);
        return;
    }

    const newFiles = [...files].filter(file => {
        if (file.size < 2 * 1024 * 1024 && file.type.startsWith('image/')) {
            return file;
        } else {
            setErrorMessage('Error: File size exceeds 2MB limit.');
            return false;
        }
    });

    // Update state เมื่อเพิ่มไฟล์
    setFiles(prev => {
        const allFiles = [...newFiles, ...prev];
        if (allFiles.length <= maxFiles) {
            return allFiles;
        } else {
            setErrorMessage(`อัพโหลดได้เพียง ${maxFiles} รูปเท่านั้น`);
            return prev;
        }
    });
    formRef.current.reset();
  }

  // function ลบรูป
  async function handleDeleteFile(index) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setErrorMessage(null); // error จะหายเมื่อลบรูป
  }
  // function เพิ่มาินค้า
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setMessage({ text: '', error: false });

    const formData = new FormData();
    formData.append('productSKU', productSKU);
    formData.append('productName', productName);
    formData.append('price', price);
    files.forEach(file => formData.append('files', file));

    try {
      const res = await fetch('/api/products/add', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();

      if (result.error) {
        setMessage({ text: result.error, error: true });
      } else {
        setMessage({ text: 'Product added successfully!', error: false });
        clearFormData();
      }
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
      <form onSubmit={handleSubmit} ref={formRef} 
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
        <label className="block mt-4">
          <span className="text-sm text-gray-600">รูปสินค้า</span>
          <input type="file" accept="image/*" multiple onChange={handleInputFiles} />
          <h5 style={{ color: 'red' }}> (*) สามารถอัพโหลดได้เพียงรูปภาพเดียว และขนาดไม่เกิน 2mb </h5>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {/* preview image */}
            <div className="mt-2" style={{  display: 'flex', gap: 10, flexWrap: 'wrap', margin: '10px 0' }}>
                {
                    files.map((file, index) => (
                        <PhotoCard key={index} url={URL.createObjectURL(file)}
                            onClick={() => handleDeleteFile(index)}
                        />
                    ))
                }
            </div>
        </label>
        <div className="flex justify-end mt-6">
          <Link href={'/products'} className="mr-3 px-2 py-1 text-white bg-green-500 rounded-sm">
            หน้าสินค้า
          </Link>
          <ButtonSubmit type="เพิ่มสินค้า" value="Upload" className="px-2 py-1 text-white bg-blue-500 rounded-sm" />
        </div>
      </form>
    </div>
  );
}
