'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FaHome } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { IoIosLogIn } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';

function Wrapper({ children }) {
  return (
    <div className="hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center">
      {children}
    </div>
  );
}

export default function NavBar() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect to homepage after signing out
  };

  return (
    <nav className="fixed top-0 w-full flex flex-col lg:flex-row bg-red-100 p-0 shadow-gray-200 shadow-sm">
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between">
        <div className="top-0 flex items-center">
          <h1 className="hidden md:block text-3xl font-bold text-gray-800">YOKYOK Fried Chicken</h1>
          <h1 className="block md:hidden text-3xl font-bold text-gray-800">YFC</h1>
        </div>

        <div className="md:flex lg:flex space-x-4">
          <div className="top-0 md:flex lg:flex lg:space-x-4 lg:w-full md:w-auto align-top">

            <Wrapper>
              <Link href="/" className="hidden lg:block">Home</Link>
            </Wrapper>

            {session ? (
              <>
                <Wrapper>
                  <Link href="/products">All Products</Link>
                </Wrapper>
                <Wrapper>
                  <Link href="/products/add">Add Product</Link>
                </Wrapper>
                <Wrapper>
                  <button onClick={handleSignOut} className="hidden lg:flex items-center">
                    <IoLogOut className="mr-2" />
                    ออกจากระบบ
                  </button>
                </Wrapper>
              </>
            ) : (
              <>
                <Wrapper>
                  <Link href="/api/auth/signin" className="hidden lg:flex items-center">
                    <IoIosLogIn className="mr-2" />
                    เข้าสู่ระบบ
                  </Link>
                </Wrapper>
                <Wrapper>
                  <Link href="/signup" className="hidden lg:flex items-center">
                    ลงทะเบียน
                  </Link>
                </Wrapper>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
