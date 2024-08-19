'use client'
import Link from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react';

function Wrapper({ children }) {
  return (
    <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
      {children}
    </div>
  );
}

export default function NavBar() {
  const { data: session, status } = useSession()
  // ขณะกำลังเข้าสู่ระบบ หรือออกจากระบบ


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
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800">Yok Yok Fried Chicken</h1>
        </div>
        
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
        <IconButton
          aria-label="open menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon/>}
        />  
      </div>
      
    </nav>
  );
}