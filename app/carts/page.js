'use client'

// อิมพอร์ตฟังก์ชัน getServerSession เพื่อรับค่า session มาใช้งานในคอมโพเนนต์
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Loading from '@/app/loading'
import  Cart   from '@/components/cart/Cart'

export default function CartPage() {
  const {data, status} =  useSession()
  // ขณะกำลังเข้าสู่ระบบ หรือออกจากระบบ
  if(status === 'loading') {
    return <Loading />
  }
  // เมื่อออกจากระบบ
  if(status === 'unauthenticated') {
    return (
      <div className='flex flex-col justify-start items-center mx-auto h-screen my-5'>
      <div className='text-3xl'>Please Sign In!!!</div>
      <Link 
      href={'api/auth/signin?callbackUrl=/profile'}
      className='ring-blue-400 ring-1 text-blue-500 rounded-sm shadow-sm py-1 px-2 my-4'
      >
          Sign In
      </Link>
  </div>
    )
  }
  // เมื่อเข้าสู่ระบบเรียบร้อย
  if(status === 'authenticated') {
      return (
        <div className='p-4 min-h-screen'>
        <Cart />
      </div>
    )
  }

  return null;
}    
