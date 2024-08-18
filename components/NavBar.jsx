import Link from 'next/link';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { FaHome } from 'react-icons/fa'

function Wrapper({ children }) {
  return (
    <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
      {children}
    </div>
  );
}

export default async function NavBar() {
  const session = await getServerSession(options);

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Profile', path: '/profile' },
    { title: 'Cart', path: '/cart' },

  ];

  if (session) {
    navItems.push({ title: 'Sign Out', path: '/api/auth/signout' });
    navItems.push({ title: 'All Products', path: '/products' });
    navItems.push({ title: 'Add Product', path: '/products/add' });
  } else {
    navItems.push({ title: 'Sign In', path: '/api/auth/signin' });
  }

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* โลโก้ทางซ้าย */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800">Yok Yok Fried Chicken</h1>
        </div>
        
        {/*menu toggle 
        <div className="md:hidden">
          <button id="menu-toggle" calssName="text-white" >
            <svg 
              fill="none" 
              stroke="currentColor" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        */}

        {/* เมนูทางขวา }
        <div className="hidden md:flex lg:flex space-x-4">
        <div className="md:flex lg:flex lg:space-x-4 lg:w-auto w-full">
          <Wrapper><Link href="/">Home</Link></Wrapper>
          <Wrapper><Link href="/profile">Profile</Link></Wrapper>
          <Wrapper><Link href="/downloads">Cart</Link></Wrapper>
          {session && <Wrapper><Link href="/api/auth/signout">Sign Out</Link></Wrapper>}
          {!session && <Wrapper><Link href="/api/auth/signin">Sign In</Link></Wrapper>}
        </div>
        </div>
        {*/}
                <div className="hidden md:flex lg:flex space-x-4">
                <div className="md:flex lg:flex lg:space-x-4 lg:w-auto w-full">
        {
          navItems.map((item,i)=>{
            return(
              <Wrapper key={i}>
                <Link href={item.path}>
                {item.title}</Link>
              </Wrapper>
            )
          })
        }
                </div>
                </div>
      </div>
      
    </nav>
  );
}