'use server'
import Link from 'next/link';
//import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
//import { IconButton , useBreakpointValue } from '@chakra-ui/react'
//import { Show, Hide } from '@chakra-ui/react'
//import { useSession } from 'next-auth/react'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'


function Wrapper({ children }) {
  return (
    <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
      {children}
    </div>
  );
}

export default async function NavBar() {
  const session = await getServerSession(options)
  {/* 
  let navItems = [
    { title: 'Home', path: '/' },
    { title: 'Profile', path: '/profile' },
    { title: 'Cart', path: '/cart' },
  ];

  if (session) {
    navItems = [
      ...navItems,
      { title: 'All Products', path: '/products' },
      { title: 'Add Product', path: '/products/add' },
      { title: 'Sign Out', path: '/api/auth/signout' },
    ];
  } else {
    navItems = [
      ...navItems,
      { title: 'Sign In', path: '/api/auth/signin' },
    ];
  } */}

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* โลโก้ทางซ้าย */}
        <div className="flex items-center ">
          <h1 className="text-3xl font-bold text-gray-800">Yok Yok Fried Chicken</h1>
        </div>
        
        {/* เมนูหลัก */}
        <div className=" md:flex lg:flex space-x-4">
        <div className="hidden md:flex lg:flex lg:space-x-4 lg:w-auto w-full">
          
        <Wrapper><Link href='/'>Home</Link></Wrapper>
        <Wrapper><Link href='/profile'>Profile</Link></Wrapper>
        <Wrapper><Link href='/downloads'>Downloads</Link></Wrapper>
        {/* แสดงเมนู Sign Out เมื่อเข้าสู่ระบบแล้ว */}
        {session && <Wrapper><Link href='/products'>All Products</Link></Wrapper>}
        {session && <Wrapper><Link href='/products/app'>Add Product</Link></Wrapper>}
        {session && <Wrapper><Link href='/api/auth/signout'>Sign Out</Link></Wrapper>}
        {/* แสดงเมนู Sign In เมื่อยังไม่ได้เข้าสู่ระบบ */}
        {!session && <Wrapper><Link href='/api/auth/signin'>Sign In</Link></Wrapper>}
        {/*}
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
        {/* side bar    
          <IconButton
            aria-label="open menu"
            size="lg"
            mr={20}
            icon={<HamburgerIcon/>}
            onClick={toggleNavBar}
          />   */}
        </div> 
        </div>
        {/* click   
        {isClick && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>
              <div className=" md:flex lg:flex space-x-4">
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
      )} */}
      </div>
    </nav>
  );
}