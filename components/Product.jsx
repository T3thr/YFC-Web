'use client'
import { useAllProducts } from '@/backend/lib/productAction'
import Image from 'next/image';
import Loading from '@/app/loading'

export default function Product() {
    const { data: products, isLoading, error } = useAllProducts();

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
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-200 shadow-md">
          <main className="flex-grow container mx-auto px-6 py-8">
            <section className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">ยินดีต้อนรับสู่ดินแดนไก่ทอด</h2>
              <p className="text-gray-600 mt-4">โปรดเลือกไก่ของคุณ</p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">เมนูแนะนำ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <Image 
                        className="w-full h-56 object-cover object-center" 
                        src={product.imageUrl}
                        alt={product.name}
                        width={500}
                        height={500}
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800">{product.productName}</h4>
                      <p className="text-gray-600 mt-2">{product.price} ฿</p>
                      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </header>
      </div>
    )
}