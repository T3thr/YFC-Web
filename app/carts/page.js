'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Loading from '@/app/loading'
import Cart from '@/components/cart/Cart'
import { useContext } from 'react'
import AuthContext from "@/context/AuthContext";

export default function CartPage() {
  const { data: session, status } = useSession();
  const { user } = useContext(AuthContext); // Get user from context directly

  // Loading state
  if (status === 'loading') {
    return <Loading />
  }

  // If user is not authenticated, show a prompt to sign in
  if (status === 'unauthenticated' && !user) {
    return (
      <div className='flex flex-col justify-start items-center mx-auto h-screen my-5'>
        <div className='text-3xl'>Please Sign In!!!</div>
        <Link 
          href={'/signin?callbackUrl=/carts'}
          className='ring-blue-400 ring-1 text-blue-500 rounded-sm shadow-sm py-1 px-2 my-4'
        >
          Sign In
        </Link>
      </div>
    )
  }

  // If user is authenticated, show the cart
  return (
    <div className='p-4 min-h-screen'>
      <Cart />
    </div>
  );
}
