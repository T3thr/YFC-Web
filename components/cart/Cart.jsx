'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Cart() {
  const [cart, setCart] = useState({ cartItems: [] });

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
      cartItems: cart.cartItems.map((item) =>
        item.product === cartItem.product
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0), // Remove items with zero quantity
    };
    updateCart(updatedCart);
  };

  const deleteItemFromCart = (productId) => {
    const updatedCart = {
      ...cart,
      cartItems: cart.cartItems.filter(item => item.product !== productId),
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
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {cart.cartItems.length} Item(s) in Cart
          </h2>
        </div>
      </section>

      {cart.cartItems.length > 0 && (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart.cartItems.map((cartItem) => (
                    <div key={cartItem.product}>
                      <div className="flex flex-wrap lg:flex-row gap-5 mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                              <img src={cartItem.image} alt={cartItem.name} />
                            </div>
                            <figcaption className="ml-4">
                              <h2 className="font-medium">{cartItem.productName}</h2>
                              <span className="text-sm text-gray-400">Price: {cartItem.price} ฿</span>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-full lg:w-1/5 text-center flex items-center justify-center">
                          <div className="inline-flex border border-gray-300 rounded-md shadow-sm">
                            <button
                              onClick={() => decreaseQty(cartItem)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-l-md"
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
                            className="bg-red-500 text-white py-2 px-4 rounded"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <div className="bg-white border border-gray-200 rounded shadow-sm p-5">
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
                    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

