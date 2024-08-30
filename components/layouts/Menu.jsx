'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Search from './Search';
import Image from 'next/image';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { FaShoppingCart } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";

// Utility function to count items in the cart
const countCartItems = (cart) => {
  return cart?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
};


export default function Menu() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const cart = JSON.parse(savedCart);
                setCartCount(countCartItems(cart));
            } else {
                setCartCount(0);
            }
        };

        // Update cart count on component mount
        updateCartCount();

        // Set up a listener for storage changes
        window.addEventListener('storage', updateCartCount);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);

    return (
      <div className='container max-w-screen-xl mx-auto px-4 lg:justify-between bg-red-100'>
        <div className='flex flex-wrap items-center'>
          <div className='flex-shrink-0 mr-auto ml-auto mx-auto lg:mx-8 mb-4 lg:mb-0'>
            <a href='/'>
              <Image
                src='/images/logo.png'
                height='40'
                width='120'
                alt='YFC'
              />
            </a>
          </div>
          
          <Search />

          <div className='flex items-center space-x-16 ml-auto justify-start mx-auto'>
            <Link
              href='/carts'
              className='px-3 py-2 mx-auto inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300'
            >
              <span className='flex lg:flex items-center ml-1'>
                <FaShoppingCart className='flex text-gray-400 w-4 items-start mr-0' />
                <span className='hidden ml-1 lg:flex'>
                  <b>({cartCount})</b> {/* Update the cart count here */}
                </span>
              </span>
            </Link>
            {/* Sign In/Out Logic */}
            {/* Profile Display */}
            <Link href='/profile'>
              <div className='hidden lg:flex items-center mb-4 space-x-3 mt-4 cursor-pointer'>
                <img
                  className='w-10 h-10 rounded-full'
                  src={'/images/default.png'}
                />
                <div className='space-y-1 font-medium'>
                  <p>
                    USER
                    <time className='block text-sm text-gray-500 dark:text-gray-400'>
                      test@gmail.com
                    </time>
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className='md:hidden sm:flex flex-wrap items-center  ml-2 justify-end md:w-full mx-auto'>
            <button
              type='button'
              className='bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent'
            >
              <span className='sr-only'>Open menu</span>
              <IoIosMenu />
            </button>
          </div>
        </div>
      </div>
    );
}
