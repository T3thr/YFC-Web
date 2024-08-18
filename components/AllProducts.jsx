'use client'

import { useState } from 'react'
import Loading from '@/app/loading'
import ProductItem from './ProductItem'
import { useAllProducts } from '@/lib/useAllProducts'
import Title from './Title'

export default function AllProducts() {
    const { data: products, isLoading, error } = useAllProducts()
    const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    }

    const handleAddProduct = async () => {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });

        if (response.ok) {
            setNewProduct({ name: '', price: '', imageUrl: '' }); 
        }
    }

    if (error) {
        return <div>{error.message}</div>
    }
    
    if (isLoading) {
        return <Loading />
    }
    
    if (products?.length === 0) {
        return (
            <div className='flex justify-center items-center min-w-full min-h-screen'>
                <div className='text-xl text-blue-400'>ไม่พบสินค้า</div>
            </div>
        )
    }
    
    return (
        <div className='flex flex-col justify-start items-center min-w-full min-h-screen'>  
            <Title text="Products List" />
            
            <div className="mb-4">
                <h3 className="text-xl mb-2">Add New Product</h3>
                <input 
                    type="text" 
                    name="name" 
                    value={newProduct.name}
                    placeholder="Product Name" 
                    onChange={handleInputChange} 
                    className="border p-2 mb-2 w-full" 
                />
                <input 
                    type="text" 
                    name="price" 
                    value={newProduct.price}
                    placeholder="Price" 
                    onChange={handleInputChange} 
                    className="border p-2 mb-2 w-full" 
                />
                <input 
                    type="text" 
                    name="imageUrl" 
                    value={newProduct.imageUrl}
                    placeholder="Image URL" 
                    onChange={handleInputChange} 
                    className="border p-2 mb-2 w-full" 
                />
                <button 
                    onClick={handleAddProduct} 
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Add Product
                </button>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full h-fit'>
                {products?.map((item, index) => (
                    <div 
                        key={index} 
                        className="bg-white border border-gray-300 p-2 rounded-sm shadow-sm"
                    >
                        <ProductItem data={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}
