import Link from 'next/link'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

// กำหนดคอมโพเนนต์เพื่อปรับแต่งหน้าตาแต่ละเมนู
function Wrapper({children}) {
  return (
    <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
      {children}
    </div>
  )
}
// กำหนด NavBar คอมโพเนนต์
export default async function NavBar() {
  const session = await getServerSession(options)
  return (
    <nav className="bg-white   shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* โลโก้ทางซ้าย */}
        <div className="flex">
          <h1 className="text-3xl font-bold text-gray-800">Yok Yok Fried Chicken</h1>
        </div>

        {/* เมนูทางขวา */}
        <div className="flex space-x-4">
          <Wrapper><Link href="/">Home</Link></Wrapper>
          <Wrapper><Link href="/profile">Profile</Link></Wrapper>
          <Wrapper><Link href="/downloads">Cart</Link></Wrapper>
          {session && <Wrapper><Link href="/api/auth/signout">Sign Out</Link></Wrapper>}
          {!session && <Wrapper><Link href="/api/auth/signin">Sign In</Link></Wrapper>}
        </div>
      </div>
    </nav>
  );
}