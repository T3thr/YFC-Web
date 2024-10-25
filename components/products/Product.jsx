'use client';

import { useSearchParams } from 'next/navigation';
import { useAllProducts } from '@/backend/lib/productAction';
import Image from 'next/image';
import Loading from '@/app/loading';
import Filters from '@/components/layouts/Filters';
import CustomPagination from "@/components/layouts/CustomPagination";

export default function Product() {
  const { data: products, isLoading, error } = useAllProducts();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || "";
  const page = parseInt(searchParams.get('page') || '1', 10);
  const resPerPage = 6;

  const minPrice = parseFloat(searchParams.get('min') || '0');
  const maxPrice = parseFloat(searchParams.get('max') || 'Infinity');
  const selectedCategories = searchParams.getAll('category');
  const selectedRatings = searchParams.getAll('ratings').map(r => parseInt(r, 10));
  const sortOrder = searchParams.get('sort') || '';

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (products?.length === 0) {
    return (
      <div className='flex justify-center items-center min-w-full min-h-screen'>
        <div className='text-xl text-blue-400'>ไม่พบสินค้า</div>
      </div>
    );
  }

  const filteredProducts = products.filter(product => {
    const matchesKeyword = product.productName.toLowerCase().includes(keyword.toLowerCase());
    const price = parseFloat(product.price);
    const matchesPrice = price >= minPrice && price <= maxPrice;
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const productRating = parseFloat(product.rating || '0');
    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.round(productRating));

    return matchesKeyword && matchesPrice && matchesCategory && matchesRating;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);

    if (sortOrder === 'price-asc') {
      return priceA - priceB;
    } else if (sortOrder === 'price-desc') {
      return priceB - priceA;
    }
    return 0;
  });

  const displayedProducts = sortedProducts.slice((page - 1) * resPerPage, page * resPerPage);
  const productsCount = filteredProducts.length;

  const addToCart = (product) => {
    requestAnimationFrame(() => {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || { cartItems: [] };
  
      const productInCart = existingCart.cartItems.find(item => item.product === product.productSKU);
  
      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        existingCart.cartItems.push({
          product: product.productSKU,
          productName: product.productName,
          price: product.price,
          images: product.images,
          quantity: 1,
        });
      }
  
      localStorage.setItem('cart', JSON.stringify(existingCart));
      window.dispatchEvent(new Event("storage"));
      alert(`${product.productName} has been added to your cart`);
    });
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <main className="container mx-auto px-6 py-8">
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">ยินดีต้อนรับสู่ดินแดนไก่ทอด</h2>
            <p className="text-gray-600 mt-4">โปรดเลือกไก่ของคุณ</p>
          </section>

          <div className="flex flex-col md:flex-row">
            <div className='lg:order-2 md:order-1 flex md:w-2/5 h-full'>
              <Filters />
            </div>

            <main className="md:w-3/5 lg:w-9/15 px-3 w-full h-full">
              <div className="lg:order-1 md:order-2">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
                  {displayedProducts.map((product) => (
                    <div key={product._id} className="flex flex-col bg-white shadow-lg rounded-lg">
                      <Image
                        src={product?.images[0]?.secure_url || "/images/default_product.png"}
                        alt={product.productName}
                        className="w-full h-56 object-cover object-center"
                        height="120"
                        width="120"
                      />
                      <div className="p-4 flex flex-col flex-grow">
                        <h4 className="text-lg font-semibold text-gray-800">{product.productName}</h4>
                        <p className="text-gray-600 mt-2">{product.price} ฿</p>
                      <div className='mt-auto'>
                        <button
                          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </main>

        <CustomPagination
          resPerPage={resPerPage}
          productsCount={productsCount}
          currentPage={page}
        />
      </header>
    </div>
  );
}
