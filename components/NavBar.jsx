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
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* โลโก้ทางซ้าย */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800">Yok Yok Fried Chicken</h1>
        </div>

        {/* Hamburger Icon */}
        <div className="block lg:hidden">
          <button className="text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* เมนูทางขวา */}
        <div className="hidden lg:flex space-x-4">
          <Wrapper><Link href="/">Home</Link></Wrapper>
          <Wrapper><Link href="/profile">Profile</Link></Wrapper>
          <Wrapper><Link href="/downloads">Cart</Link></Wrapper>
          {session && <Wrapper><Link href="/api/auth/signout">Sign Out</Link></Wrapper>}
          {!session && <Wrapper><Link href="/api/auth/signin">Sign In</Link></Wrapper>}
        </div>
        
        {/* Responsive Menu */}
        <div className="lg:hidden fixed inset-0 bg-white z-50 transform transition-transform translate-x-full">
          <div className="flex flex-col p-4">
            <Wrapper><Link href="/">Home</Link></Wrapper>
            <Wrapper><Link href="/profile">Profile</Link></Wrapper>
            <Wrapper><Link href="/downloads">Cart</Link></Wrapper>
            {session && <Wrapper><Link href="/api/auth/signout">Sign Out</Link></Wrapper>}
            {!session && <Wrapper><Link href="/api/auth/signin">Sign In</Link></Wrapper>}
          </div>
        </div>
      </div>
    </nav>
  );
}
