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


  // If user is authenticated, show the cart
  return (
    <div className='p-4 min-h-screen'>
      <Cart />
    </div>
  );
}
