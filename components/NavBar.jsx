'use server'
import Link from 'next/link';
//import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
//import { IconButton , useBreakpointValue } from '@chakra-ui/react'
//import { Show, Hide } from '@chakra-ui/react'
//import { useSession } from 'next-auth/react'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { FaHome } from 'react-icons/fa'
import { FaShoppingCart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoIosLogIn } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

function Wrapper({ children }) {
  return (
    <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
      {children}
    </div>
  );
}

export default async function NavBar() {
  const session = await getServerSession(options)

  return (
    <nav className=" top-0 w-full flex flex-col lg:flex-row  p-0 shadow-gray-200 shadow-sm bg-red-100">
      <div className=" container mx-auto flex flex-col lg:flex-row items-center lg:justify-between">
        {/* โลโก้ทางซ้าย */}
        <div className="flex items-center ">
          <h1 className="text-3xl font-bold text-gray-800">Yok Yok Fried Chicken</h1>
        </div>
        
        {/* เมนูหลัก */}
        <div className=" md:flex lg:flex space-x-4">
        <div className=" md:flex lg:flex lg:space-x-4 lg:w-auto md:w-full ">
        {/* <Wrapper><Link href={'/'} className={`flex items-center justify-center lg:hidden `}>
          <FaHome />
        </Link> </Wrapper> 
        <Wrapper><Link href='/' className={`hidden lg:block`}>Home</Link></Wrapper> 
        <Wrapper><Link href={'/profile'} className={`flex items-center justify-center lg:hidden `}>
          <VscAccount /> Profile
        </Link> </Wrapper>
        <Wrapper><Link href='/profile' className={`hidden lg:block`}>Profile</Link></Wrapper>
        <Wrapper><Link href={'/carts'} className={`flex items-center justify-center lg:hidden `}>
          <FaShoppingCart /> Cart
        </Link> </Wrapper>  
        <Wrapper><Link href='/carts' className={`hidden lg:block`}>Cart</Link></Wrapper> */}
        {/* แสดงเมนู Sign Out เมื่อเข้าสู่ระบบแล้ว */}
        {session && (
            <Wrapper>
                <Link href='/products'>All Products</Link>
                <Link href='/products/add'>Add Product</Link>
                <Link href={'/api/auth/signout'} className={`flex items-center justify-center lg:hidden `}>
                    < IoLogOut /> Sign Out
                </Link> 
                <Link href='/api/auth/signout' className={`hidden lg:block`}>Sign Out</Link>
            </Wrapper>
        )}
        {/* แสดงเมนู Sign In เมื่อยังไม่ได้เข้าสู่ระบบ */}
        {!session && (
            <Wrapper>
                <Link href={'/api/auth/signin'} className={`flex items-center justify-center lg:hidden `}>
                    <IoIosLogIn /> Sign In
                </Link>
                <Link href='/api/auth/signin' className={`hidden lg:block`}>Sign In</Link>
            </Wrapper>
        )}
        </div> 
        </div>
      </div>
    </nav>
  );
}