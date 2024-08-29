'use client';

import Loading from '@/app/loading';
import ProductItem from './ProductItem';
import { useAllProducts } from '@/backend/lib/productAction';
import Title from './Title';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AllProducts() {
  const { data: products, isLoading, error } = useAllProducts();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword')?.toLowerCase() || '';

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  // Filter products based on the keyword
  const filteredProducts = products?.filter((product) =>
    product.productName.toLowerCase().includes(keyword) ||
    product.productSKU.toLowerCase().includes(keyword)
  );

  if (filteredProducts?.length === 0) {
    return (
      <div className='flex justify-center items-center min-w-full min-h-screen'>
        <div className='text-xl text-blue-400'>ไม่พบสินค้า</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-start items-center min-w-full min-h-screen'>
      <Title text="Products List" />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full h-fit'>
        {filteredProducts?.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 p-2 rounded-sm shadow-sm round-sm"
          >
            <ProductItem data={item} />
          </div>
        ))}
      </div>
      <Link
        href={'/products/add'}
        className="block p-2 mt-12 items-center justify-center text-center text-gray-700 bg-blue-400 hover:bg-blue-300 active:bg-blue-600 rounded-sm shadow-md"
      >
        เพิ่มสินค้า
      </Link>
    </div>
  );
}
