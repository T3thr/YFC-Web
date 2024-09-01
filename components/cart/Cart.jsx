'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cart, setCart] = useState({ cartItems: [] });
  const [editMode, setEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
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
    // อัพเดท รายการในตะกร้า เรียลไทม์
    window.dispatchEvent(new Event("storage"));
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

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedItems([]); // ตั้งจำนวนการเลือกเป็น 0 เมื่อกดแก้ไขรายการ
  };

  const handleSelectItem = (product) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(product)
        ? prevSelected.filter((sku) => sku !== product)
        : [...prevSelected, product]
    );
  };

  const deleteSelectedItems = () => {
    const updatedCart = {
      ...cart,
      cartItems: cart.cartItems.filter(
        (item) => !selectedItems.includes(item.product)
      ),
    };
    updateCart(updatedCart);
    setSelectedItems([]);
    setEditMode(false);
  };

  const amountWithoutTax = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const taxAmount = (100).toFixed(2);
  //const taxAmount = (amountWithoutTax * 0.15).toFixed(2);
  const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);

  return (
    <>
      <section className="py-10 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg shadow-black">
              ตะกร้าของคุณ ({cart.cartItems.length} Item(s){cart.cartItems.length !== 1 && 's'})
            </h2>
            <Link href="/checkout">
              <button className="bg-white text-purple-600 py-2 px-6 rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition duration-300">
                ไปยังหน้าชำระเงิน
              </button>
            </Link>
          </div>
        </div>
      </section>

      {cart.cartItems.length > 0 ? (
        <section className="py-12 bg-gray-100">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-row gap-4 mb-8">
              <button
                onClick={toggleEditMode}
                className={`${
                  editMode ? 'bg-red-500' : 'bg-yellow-400'
                } text-white py-2 px-4 rounded-lg shadow-lg hover:${
                  editMode ? 'bg-red-600' : 'bg-yellow-500'
                } transition duration-300`}
              >
                {editMode ? 'ยกเลิก' : 'แก้ไข'}
              </button>
              {editMode && selectedItems.length > 0 && (
                <button
                  onClick={deleteSelectedItems}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                >
                  ลบรายการที่เลือก
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row sm:flex-row gap-12">
              <main className="md:w-3/4 flex flex-col gap-1">
                {cart.cartItems.map((cartItem) => (
                  <article
                    key={cartItem.product}
                    className={`flex flex-wrap lg:flex-row gap-6 p-6 rounded-lg bg-white shadow-lg ${
                      selectedItems.includes(cartItem.product)
                        ? 'ring-4 ring-purple-300'
                        : ''
                    } transition duration-300`}
                  >
                    {editMode && (
                      <div className="w-full lg:w-1/12 flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(cartItem.product)}
                          onChange={() => handleSelectItem(cartItem.product)}
                          className="w-6 h-6 text-purple-600 rounded focus:ring-0 cursor-pointer"
                        />
                      </div>
                    )}
                    <div className="w-full lg:w-2/5 xl:w-1/3">
                      <figure className="flex leading-5">
                        <div className="block w-24 h-24 rounded border border-gray-200 overflow-hidden shadow-lg">
                          <img
                            src={cartItem?.images[0]?.secure_url || '/images/default_product.png'}
                            alt={cartItem.productName}
                            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                          />
                        </div>
                        <figcaption className="ml-4">
                          <h2 className="font-semibold text-lg text-gray-800 hover:text-purple-600 transition-colors duration-300">
                            {cartItem.productName}
                          </h2>
                          <span className="text-gray-500">ราคา : {cartItem.price} ฿</span>
                        </figcaption>
                      </figure>
                    </div>
                    <div className="w-full lg:w-1/5 text-center flex items-center justify-center">
                      <div className="inline-flex border border-gray-300 rounded-md shadow-sm overflow-hidden">
                        <button
                          onClick={() => decreaseQty(cartItem)}
                          className={`px-4 py-2 rounded-l-md ${
                            cartItem.quantity === 1
                              ? 'bg-gray-500 cursor-not-allowed'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                          disabled={cartItem.quantity === 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-2 border-t border-b border-gray-300">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(cartItem)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </main>
              <aside className="md:w-1/4">
                <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h3>
                  <div className="flex justify-between mb-4 text-gray-700">
                    <span>ราคา</span>
                    <span>{amountWithoutTax.toFixed(2)} ฿</span>
                  </div>
                  <div className="flex justify-between mb-4 text-gray-700">
                    <span>ค่าส่ง </span>
                    <span>{taxAmount} ฿</span>
                  </div>
                  <div className="flex justify-between font-semibold text-xl mb-4 text-gray-900">
                    <span>ยอดรวม</span>
                    <span>{totalAmount} ฿</span>
                  </div>
                  <Link href="/checkout">
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 shadow-md mb-4">
                      Proceed to Checkout
                    </button>
                  </Link>
                  <button
                    onClick={() => router.back()}
                    className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md"
                  >
                    Continue Shopping
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-300">
          <div className="container max-w-screen-xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-semibold mb-6 text-gray-800 drop-shadow-lg">
              Your cart is currently empty
            </h3>
            <Link href="/">
              <button className="bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
