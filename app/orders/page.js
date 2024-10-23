import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import OrderList from '@/components/orders/OrderList';
import Link from 'next/link'

export default async function UserOrdersPage() {
  const session = await getServerSession(options)
  // ตรวจสอบว่าได้เข้าสู่ระบบแล้ว และมีข้อมูลผู้ใช้ 
  if(session && session.user) {
  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Your Orders</h2>
      <OrderList />
    </div>
  );
  }

  // กำหนดปุ่ม Sign In เมื่อยังไม่ได้เข้าสู่ระบบ
  return (
    <div className='flex flex-col justify-start items-center mx-auto h-screen my-5'>
        <div className='text-3xl'>Please Sign In!!!</div>
        <Link 
        href={'/signin?callbackUrl=/profile'}
        className='ring-blue-400 ring-1 text-blue-500 rounded-sm shadow-sm py-1 px-2 my-4'
        >
            Sign In
        </Link>
    </div>
  )
}

