'use client'
import { useRef, useState } from 'react'
import PhotoCard from './PhotoCard'
import ButtonSubmit from './ButtonSubmit'
import { revalidate, uploadPhoto } from '@/lib/uploadActions'
import { revalidatePath } from 'next/cache'

const UploadForm = () => {
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

    return (
        <form action={handleUpload} ref={formRef}>

            <div style={{ background: '#ddd',minHeight: 200,margin: '10px 0',padding: 10 }}>
                <input type='file' accept='image/*' multiple onChange={handleInputFiles} />
                <h5 style={{ color: 'red' }}>
                    (*) สามารถอัพโหลดได้เพียงรูปภาพเดียว และขนาดไม่เกิน 2mb
                </h5>

                {/* preview image */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '10px 0' }}>
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
            
            <ButtonSubmit value='Upload to Cloudinary' />

        </form>
    )
}

export default UploadForm;
