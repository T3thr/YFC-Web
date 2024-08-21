'use client'
import { useRef, useState } from 'react';
import Loading from '@/app/loading';
import Link from 'next/link';
import Title from '@/components/Title';
import UploadForm from '@/components/UploadForm';
import PhotoCard from './PhotoCard'
import ButtonSubmit from './ButtonSubmit'
import { revalidate, uploadPhoto } from '@/lib/uploadActions'
import { revalidatePath } from 'next/cache'



export default function AddProductForm() {

  const formRef = useRef();
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null); // ข้อความ error

  async function handleInputFiles(e) {
      const files = e.target.files;
      const maxFiles = 1;

      // ตรวจสอบว่าไฟล์ที่อัพโหลดเกินลืมิตไหม
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

  async function handleDeleteFile(index) {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      setErrorMessage(null); // error จะหายเมื่อลบลบ
  }

  async function handleUpload() {
      if(!files.length) return alert('โปรดอัพโหลดรูปสินค้า')
      
      const formData = new FormData();

      files.forEach(file => {
          formData.append('files', file)
      }) 

      const res = await uploadPhoto(formData)
      if(res?.msg) alert('Success : ' + res?.msg) // await delay(2000)
      if(res?.errMsg) alert('Error : ' + res?.errMsg)

      setFiles([])
      formRef.current.reset()
      // delay ประมาณ 2 วิ
      // จากนั้น call getAllPhoto()
      revalidate("/")

  }
  

  
  const [productSKU, setProductSKU] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [message, setMessage] = useState({
    text:null,
    error:false
  });
  
  function clearFormData() {
    setProductName('')
    setProductSKU('')
    setPrice('')
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
            price
          })
        })
        const result = await res.json()

        if (result.error) {
          setMessage({ ...message, text: result.error, error: true });
        } else if (result.productSKU) {
          setMessage({ ...message, text: 'Add Product Successfully!', error: false });
        }

        clearFormData()

        // Clear image files
        setFiles([]); 
        
    } catch (error) {
        
        setMessage({...message, text:error.message, error: true})
    } finally {
        setIsLoading(false)
    }
  };
  
  if(isLoading) {
    return   <Loading /> 
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
    
    <form action={handleUpload} ref={formRef}
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
        </div>
        
        <div style={{ background: '#ddd',minHeight: 200,margin: '10px 0',padding: 10 }}>
            <input type='file' accept='image/*' multiple onChange={handleInputFiles} />
            <h5 style={{ color: 'red' }}>
                (*) สามารถอัพโหลดได้เพียงรูปภาพเดียว และขนาดไม่เกิน 2mb
            </h5>

            {/* preview image */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '10px 0' , alignItems: 'center' ,justifyContent: 'center'  }}>
                {
                    files.map((file, index) => (
                        <PhotoCard key={index} url={URL.createObjectURL(file)}
                            onClick={() => handleDeleteFile(index)}
                        />
                    ))
                }
            </div>

            <div className='flex flex-col items-center'>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </div>

               

        <div className="flex justify-end mt-6">
        <Link
            href={'/products'}
            className="text-center w-24 mr-3 px-2 py-1 text-white bg-green-500 rounded-sm hover:bg-green-400 focus:outline-none active:bg-green-600"
        >
            หน้าสินค้า
        </Link>
        <button
          value='Upload to Cloudinary'
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