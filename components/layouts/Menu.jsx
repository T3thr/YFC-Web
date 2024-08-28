import React, { useContext } from 'react';
import Link from 'next/link';
import Search from './Search';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { FaHome } from 'react-icons/fa'
import { FaShoppingCart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoIosLogIn } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import NavBar from '@/components/NavBar';
import CartContext from '@/context/CartContext';

function Wrapper({ children }) {
    return (
      <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
        {children}
      </div>
    );
  }

export default async function Menu() {
    const session = await getServerSession(options)

    return(
    <div className=' container max-w-screen-xl mx-auto px-4 lg:justify-between  bg-red-100  '>
      <div className='flex flex-wrap items-center'>
        <div className='flex-shrink-0 lg:mr-5 lg:ml-0 mx-auto lg:mx-0 mb-4 lg:mb-0'>
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

        <div className='flex items-center space-x-2 ml-auto justify-start mx-auto'>
          <Link
            href='/carts'
            className='px-3 py-2 mx-auto inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300'
          >
          <span className='flex lg:flex items-center ml-1'>
          <FaShoppingCart className='flex text-gray-400 w-4 items-start mr-0' />
          <span className='hidden ml-1 lg:flex'>
            <b>( 0 )</b>
          </span>
          </span>
          </Link>
          {!session && 
          <Wrapper>
            <Link
            href='/api/auth/signin'
            className='px-3 py-2 lg:px-1 lg:mt-auto inline-block justify-start text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300'
          >
            <span className='flex lg:flex md:hidden items-center ml-1'>
          <IoIosLogIn className=' flex text-gray-400 w-3 mr-1 ' />
          <span className='hidden ml-1 lg:flex'>
              <b>Sign In</b>
          </span>
          </span>
          </Link></Wrapper> }

          {session && 
          <Wrapper>
            <Link
            href='/api/auth/signout'
            className='px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300'
          >
          <span className='flex lg:flex md:hidden items-center ml-1'>
          <IoLogOut className=' flex text-gray-400 w-3 mr-1 ' />
          <span className='hidden ml-1 lg:flex'>
              <b>Sign Out</b>
          </span>
          </span>
          </Link></Wrapper> }

          <Link href='/profile'>
            <div className='flex items-center mb-4 space-x-3 mt-4 cursor-pointer'>
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
    )

}