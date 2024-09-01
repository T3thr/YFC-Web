// app/checkout/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/app/loading';

export default function CheckoutPage() {
  const [cart, setCart] = useState({ cartItems: [] });
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

    useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      // Redirect to the cart page if there's no saved cart
      router.push('/cart');
    }
  }, [router]);

  if (cart.cartItems.length === 0) {
    // Optionally show a loading or empty state here while redirecting
    return <Loading />;
  }

  const amountWithoutShip = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shipAmount = (100).toFixed(2);
  const totalAmount = (Number(amountWithoutShip) + Number(shipAmount)).toFixed(2);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {


      // Clear the cart
      localStorage.removeItem('cart');
      setCart({ cartItems: [] });


      // Redirect to a confirmation or thank you page
      router.push('/confirmation');
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {isProcessing ? (
        <Loading />
      ) : (
        <>
          <section className="py-10 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="container max-w-screen-xl mx-auto px-4">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg shadow-black">
                  Checkout
                </h2>
              </div>
            </div>
          </section>

          <section className="py-12 bg-gray-100">
            <div className="container max-w-screen-xl mx-auto px-4">
              <div className="flex flex-col md:flex-row sm:flex-row gap-12">
                <main className="md:w-3/4 flex flex-col gap-1">
                  {cart.cartItems.map((cartItem) => (
                    <article
                      key={cartItem.product}
                      className="flex flex-wrap lg:flex-row gap-6 p-6 rounded-lg bg-white shadow-lg"
                    >
                      <div className="w-full lg:w-2/5 xl:w-1/3">
                        <figure className="flex leading-5">
                          <div className="block w-24 h-24 rounded border border-gray-200 overflow-hidden shadow-lg">
                            <img
                                src={cartItem?.images[0]?.secure_url || '/images/default_product.png'}
                                alt={cartItem.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <figcaption className="ml-4">
                            <h2 className="font-semibold text-lg text-gray-800">
                              {cartItem.productName}
                            </h2>
                            <span className="text-gray-500">ราคา : {cartItem.price} ฿</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="w-full lg:w-1/5 text-center flex items-center justify-center">
                        <span className="px-4 py-2 border-t border-b border-gray-300">
                          {cartItem.quantity}
                        </span>
                      </div>
                    </article>
                  ))}
                </main>
                <aside className="md:w-1/4">
                  <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>
                    <div className="flex justify-between mb-4 text-gray-700">
                      <span>ราคา</span>
                      <span>{amountWithoutShip.toFixed(2)} ฿</span>
                    </div>
                    <div className="flex justify-between mb-4 text-gray-700">
                      <span>ค่าส่ง </span>
                      <span>{shipAmount} ฿</span>
                    </div>
                    <div className="flex justify-between font-semibold text-xl mb-4 text-gray-900">
                      <span>ยอดรวม</span>
                      <span>{totalAmount} ฿</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md mb-4"
                    >
                      Check Bills
                    </button>
                    <Link href="/carts">
                      <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md">
                        ย้อนกลับ
                      </button>
                    </Link>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
