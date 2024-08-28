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
import NavBar from '@/components/NavBar';
import CartContext from '@/context/CartContext';
import Menu from './Menu'

export default async function Header() {
  const session = await getServerSession(options)

  return (
    <header className='fixed top-0 w-full flex flex-col lg:flex-row  p-0 bg-white py-0 border-b z-50'>

    <div className='top-0 flex '>   
    <NavBar />
    </div>
    <div  className="  w-full flex lg:flex-row shadow-gray-200 shadow-sm bg-red-100 z-50"
        style={{ marginTop: '2.5rem' }}
  >
    <Menu/>
    </div>
    </header>

  );
};