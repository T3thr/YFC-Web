'use client'; // This directive ensures the component is treated as a Client Component

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/styles/navbar.module.scss'; // Adjust the path as needed

export default function HamburgerMenu({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative lg:hidden">
      <button className={styles.hamburger} onClick={toggleMenu}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <div className={`${styles.menu} ${isOpen ? 'open' : ''}`}>
        <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
          <Link href="/">Home</Link>
        </div>
        <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
          <Link href="/profile">Profile</Link>
        </div>
        <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
          <Link href="/downloads">Cart</Link>
        </div>
        {session ? (
          <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
            <Link href="/api/auth/signout">Sign Out</Link>
          </div>
        ) : (
          <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
            <Link href="/api/auth/signin">Sign In</Link>
          </div>
        )}
      </div>
    </div>
  );
}
