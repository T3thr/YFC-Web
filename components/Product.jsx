'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useAllProducts } from '@/backend/lib/productAction'
import Image from 'next/image';
import Loading from '@/app/loading'
import Filters from '@/components/layouts/Filters'
import CustomPagination from "@/components/layouts/CustomPagination";
import PhotoGallery from '@/components/PhotoGallery';
import ProductItem from './ProductItem';

export default function Product() {
    const { data: products, isLoading, error } = useAllProducts();
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword') || "";
    const page = parseInt(searchParams.get('page') || '1', 10);
    const resPerPage = 6; // Define how many items per page

    // Extract filters from searchParams
    const minPrice = parseFloat(searchParams.get('min') || '0');
    const maxPrice = parseFloat(searchParams.get('max') || 'Infinity');
    const selectedCategories = searchParams.getAll('category');
    const selectedRatings = searchParams.getAll('ratings').map(r => parseInt(r, 10));
    const sortOrder = searchParams.get('sort') || '';


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

      // Filter products based on keyword
  const filteredProducts = products.filter(product => {
    product.productName.toLowerCase().includes(keyword.toLowerCase())

    // Check price range
    const price = parseFloat(product.price);
    if (price < minPrice || price > maxPrice) return false;

    // Check category
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;

    // Check rating
    const productRating = parseFloat(product.rating || '0');
    if (selectedRatings.length > 0 && !selectedRatings.includes(Math.round(productRating))) return false;

    return true;
  });

    // Sort products based on the sortOrder
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

    // Paginate products
    const displayedProducts = sortedProducts.slice((page - 1) * resPerPage, page * resPerPage);
    const productsCount = filteredProducts.length;

    const addToCart = (product) => {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || { cartItems: [] };
      const productInCart = existingCart.cartItems.find(item => item.product === product._id);

      if (productInCart) {
          // Update quantity if product already in cart
          productInCart.quantity += 1;
      } else {
          // Add new product to cart
          existingCart.cartItems.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));
  };

    return (
      <div className="flex flex-col min-h-screen">
        <header >
          <main className="container mx-auto px-6 py-8">
            <section className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">ยินดีต้อนรับสู่ดินแดนไก่ทอด</h2>
              <p className="text-gray-600 mt-4">โปรดเลือกไก่ของคุณ</p>
            </section>

            <div className="flex flex-col md:flex-row ">
              <div className='lg:order-2 md:order-1 flex md:w-2/5 h-full'  >
                <Filters />
              </div>

            <main className="md:w-3/5 lg:w-9/15 px-3 w-full h-full">
            <div className="lg:order-1 md:order-2 ">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
                
                {displayedProducts.map((product, index) => (
                  <div key={index} className="bg-white shadow-lg rounded-lg ">
                    <Image 
                        src={
                          product?.images[0]
                          ? product?.images[0].url
                          : "/images/default_product.png"
                        }
                        alt={product.productName}
                        width={500}
                        height={500}
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800">{product.productName}</h4>
                      <p className="text-gray-600 mt-2">{product.price} ฿</p>
                      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                      onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                  </div>
                ))}               
              </div>
            </div>
            <CustomPagination
              resPerPage={resPerPage}
              productsCount={productsCount}
            />   
            </main>
            </div>
          </main>
        </header>
      </div>
    )
}