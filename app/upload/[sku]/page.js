'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UploadImages from '@/components/admin/UploadImages'; // Path to your UploadImages component
import { useProductBySKU } from '@/backend/lib/productAction'; // Adjust import based on your file structure
import Image from 'next/image';
import Link from 'next/link';

const UploadPage = ({ params }) => {
    const router = useRouter();
    const { sku } = params;
    const { data: product, isLoading } = useProductBySKU(sku);

    useEffect(() => {
        if (!isLoading && !product) {
            // Handle case where product is not found
            router.push('/products');
        }
    }, [isLoading, product, router]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Upload Image for Product SKU: {sku}</h1>
            {product && (
                <div>
                    <div className='mb-4'>
                        <Image
                            src={product.images > 0 ? product.images[0].url : '/images/default_product.png'}
                            alt={product.productName}
                            className='w-full h-56 object-cover object-center'
                            height='240'
                            width='240'
                        />
                    </div>
                    <UploadImages sku={sku} />
                </div>
            )}
            <Link href={`/products`}>
                <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4'>
                    Back to Products
                </button>
            </Link>
        </div>
    );
};

export default UploadPage;
