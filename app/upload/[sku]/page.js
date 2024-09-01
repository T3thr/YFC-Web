// /app/upload/[sku]/page.js
'use client'

import React, { useState , useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { uploadPhoto } from '@/backend/lib/uploadActions';
import { useProductBySKU } from '@/backend/lib/productAction';
import DeleteImageButton from '@/components/DeleteImageButton'; 
import Loading from '@/app/loading';

export default function UploadImagePage({ params }) {
    const router = useRouter();
    const { sku } = params;
    const { data, isLoading, error, mutate } = useProductBySKU(sku);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    // Create preview URL for the selected file
    useEffect(() => {
        if (selectedFile) {
            const objectURL = URL.createObjectURL(selectedFile);
            setPreviewURL(objectURL);

            return () => URL.revokeObjectURL(objectURL);
        }
    }, [selectedFile]);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setUploadStatus(''); // Clear previous upload status
    };

    // Handle file upload
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('files', selectedFile);

        setUploadStatus('Uploading...');
        const response = await uploadPhoto(formData, sku);

        if (response.errMsg) {
            setUploadStatus(`Upload failed: ${response.errMsg}`);
        } else {
            setUploadStatus('Upload successful!');
            mutate(); // Refresh product data
            setSelectedFile(null); // Clear selected file after upload
        }
    };

    if (isLoading) return <Loading/>;
    if (error) return <p>Error loading product: {error.message}</p>;

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">เพิ่มรูปภาพให้ {data.productName}</h1>

            <div className="flex justify-center mb-6">
                <Image
                    src={previewURL || (data.images?.[0]?.url) || "/images/default_product.png"}
                    alt={data.productName || "Product Image"}
                    className="rounded-lg shadow-lg"
                    height="240"
                    width="240"
                />
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                />
                {selectedFile && previewURL && (
                    <div className="mt-4">
                        <p className="text-gray-600">Image Preview:</p>
                        <Image
                            src={previewURL}
                            alt="Image Preview"
                            className="rounded-lg shadow-md"
                            height="120"
                            width="120"
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    เพิ่มรูป
                </button>
                {uploadStatus && (
                    <p className={`mt-2 text-center ${uploadStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
                        {uploadStatus}
                    </p>
                )}
            </form>

            {data.images && data.images.length > 0 && (
                <div className="mt-6 text-center">
                    {data.images.map((image) => (
                        <DeleteImageButton key={image.public_id} sku={sku} imageId={image.public_id} />
                    ))}
                </div>
            )}

            <button
                onClick={() => router.push('/products')}
                className="mt-8 w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
                ย้อนกลับ
            </button>
        </div>
    );
}