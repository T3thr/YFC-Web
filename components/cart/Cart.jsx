'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cart, setCart] = useState({ cartItems: [] });
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const increaseQty = (cartItem) => {
    const updatedCart = {
      ...cart,
      cartItems: cart.cartItems.map((item) =>
        item.product === cartItem.product
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    };
    updateCart(updatedCart);
  };

  const decreaseQty = (cartItem) => {
    const updatedCart = {
      ...cart,
      cartItems: cart.cartItems
        .map((item) =>
          item.product === cartItem.product
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    };
    updateCart(updatedCart);
  };

  const deleteItemFromCart = (productId) => {
    const updatedCart = {
      ...cart,
      cartItems: cart.cartItems.filter((item) => item.product !== productId),
    };
    updateCart(updatedCart);
  };

  const amountWithoutTax = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const taxAmount = (amountWithoutTax * 0.15).toFixed(2);
  const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);

  return (
    <>
      <section className="py-5 sm:py-7 bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-4">
            Your Cart ({cart.cartItems.length} Item{cart.cartItems.length !== 1 && 's'})
          </h2>
        </div>
      </section>

      {cart.cartItems.length > 0 ? (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-md rounded-lg mb-5 p-5">
                  {cart.cartItems.map((cartItem) => (
                    <div key={cartItem.product} className="flex flex-wrap lg:flex-row gap-5 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="w-full lg:w-2/5 xl:w-1/3">
                        <figure className="flex leading-5">
                          <div className="block w-24 h-24 rounded border border-gray-200 overflow-hidden">
                            <img
                              src={cartItem.images[0] || "/images/default_product.png"}
                              alt={cartItem.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <figcaption className="ml-4">
                            <h2 className="font-semibold text-xl">{cartItem.productName}</h2>
                            <span className="text-gray-500">Price: {cartItem.price} ฿</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="w-full lg:w-1/5 text-center flex items-center justify-center">
                        <div className="inline-flex border border-gray-300 rounded-md shadow-sm">
                          <button
                            onClick={() => decreaseQty(cartItem)}
                            className={`px-4 py-2 rounded-l-md ${cartItem.quantity === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                            disabled={cartItem.quantity === 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-2 border-t border-b border-gray-300">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => increaseQty(cartItem)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-full lg:w-1/5 text-center flex items-center justify-center">
                        <button
                          onClick={() => deleteItemFromCart(cartItem.product)}
                          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="flex justify-between mb-4">
                    <span>Subtotal</span>
                    <span>{amountWithoutTax.toFixed(2)} ฿</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>Tax (15%)</span>
                    <span>{taxAmount} ฿</span>
                  </div>
                  <div className="flex justify-between font-semibold text-xl mb-4">
                    <span>Total</span>
                    <span>{totalAmount} ฿</span>
                  </div>
                  <Link href="/checkout">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-4 transition-colors duration-300">
                      Proceed to Checkout
                    </button>
                  </Link>
                  <button
                    onClick={() => router.back()}
                    className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-10 bg-gray-50">
          <div className="container max-w-screen-xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-semibold mb-4">Your cart is currently empty</h3>
            <Link href="/">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Go Back to Shopping
              </button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
