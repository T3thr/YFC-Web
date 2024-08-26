import React from 'react';
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
import NavBar from '@/components/NavBar';

function Wrapper({ children }) {
    return (
      <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
        {children}
      </div>
    );
  }

export default async function Header() {
  const session = await getServerSession(options)
  return (
    <header className='fixed top-0 w-full flex flex-col lg:flex-row  p-0 bg-white py-0 border-b'>
        
    <NavBar />
    <div className=" fixed w-full flex shadow-gray-200 shadow-sm bg-red-100 top-12 z-50">
      <div className=' container max-w-screen-xl mx-auto px-4  bg-red-100  '>
        <div className='flex flex-wrap items-center'>
          <div className='flex-shrink-0 mr-5 sm:align-middle sm:justify-center'>
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

          <div className='flex items-center space-x-2 ml-auto'>
            <Link
              href='/cart'
              className='px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300'
            >
            <span className='hidden lg:flex items-center ml-1'>
            <FaShoppingCart className='text-gray-400 w-5' />
            <span className='ml-1'>
                <b>(0)</b>
            </span>
            </span>
            </Link>
            {!session && 
            <Wrapper>
              <Link
              href='/api/auth/signin'
              className='px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300'
            >
              <i className='text-gray-400 w-10 h-10 fa fa-user'></i>
              <span className='hidden lg:flex items-center ml-1'>Sign In</span>
            </Link></Wrapper> }

            {session && 
            <Wrapper>
              <Link
              href='/api/auth/signout'
              className='px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300'
            >
              <i className='text-gray-400 w-5 fa fa-user'></i>
              <span className='hidden lg:inline ml-1'>Sign out</span>
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

          <div className='lg:hidden ml-2'>
            <button
              type='button'
              className='bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent'
            >
              <span className='sr-only'>Open menu</span>
              <i className='fa fa-bars fa-lg'></i>
            </button>
          </div>
        </div>
      </div>
      </div>
    </header>

  );
};