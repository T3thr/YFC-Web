
import Link from 'next/link'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

function Wrapper({children}) {
    return (
        <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
            {children}
        </div>
    )
}

export default function Product() {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-white shadow-md">

        </header>
  
        <main className="flex-grow container mx-auto px-6 py-8">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">ยินดีต้อนรับสู่ดินแดนไก่ทอด</h2>
            <p className="text-gray-600 mt-4">โปรดเลือกไก่ของคุณ</p>
          </section>
  
          <section>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">เมนูแนะนำ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img className="w-full h-56 object-cover object-center" src="https://via.placeholder.com/300" alt="Product 1" />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">ไก่บูด 1</h4>
                  <p className="text-gray-600 mt-2">$100.00</p>
                  <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add to Cart</button>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img className="w-full h-56 object-cover object-center" src="https://via.placeholder.com/300" alt="Product 2" />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">ไก่บูด 2</h4>
                  <p className="text-gray-600 mt-2">$200.00</p>
                  <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add to Cart</button>
                </div>
              </div>
              {/* Add more products as needed */}
            </div>
          </section>
        </main>
        </div>
    )
}