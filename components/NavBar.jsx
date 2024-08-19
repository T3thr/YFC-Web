'use client'
import Link from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { IconButton , useBreakpointValue } from '@chakra-ui/react'
import { Show, Hide } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react';


function Wrapper({ children }) {
  return (
    <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
      {children}
    </div>
  );
}

export default function NavBar() {
  const { data, status } = useSession()
  const [isClick, setisClick] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const toggleNavBar = () => {
    setisClick(!isClick)
  }

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Profile', path: '/profile' },
    { title: 'Cart', path: '/cart' },
  ];

  if (status === 'authenticated') {
    navItems.push({ title: 'All Products', path: '/products' });
    navItems.push({ title: 'Add Product', path: '/products/add' });
    navItems.push({ title: 'Sign Out', path: '/api/auth/signout' });
  } else {
    navItems.push({ title: 'Sign In', path: '/api/auth/signin' });
  }

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* โลโก้ทางซ้าย */}
        <div className="flex items-center ">
          <h1 className="text-3xl font-bold text-gray-800">Yok Yok Fried Chicken</h1>
        </div>
        {/* เมนูหลัก */}
        <div className=" md:flex lg:flex space-x-4">
        <div className="hidden md:flex lg:flex lg:space-x-4 lg:w-auto w-full">
        {
          navItems.map((item,i)=>{
            return(
              <Wrapper key={i}>
                <Link href={item.path}>
                {item.title}</Link>
              </Wrapper>      
            )
          })
        }
        </div>
        {/* side bar */}     
          <IconButton
            aria-label="open menu"
            size="lg"
            mr={20}
            icon={<HamburgerIcon/>}
            onClick={toggleNavBar}
          />
        </div>
      </div>
      {/* click */}  
      {isClick && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>
            <div className=" md:flex lg:flex space-x-4">
            <div className="md:flex lg:flex lg:space-x-4 lg:w-auto w-full">
            {
              navItems.map((item,i)=>{
                return(
                  <Wrapper key={i}>
                    <Link href={item.path}>
                    {item.title}</Link>
                  </Wrapper>
                )
              })
            }
            </div>
            </div>
          </div>
      )}
    </nav>
  );
}