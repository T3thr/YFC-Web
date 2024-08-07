import Link from 'next/link'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

function Wrapper({children}) {
    return (
        <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
            {children}
        </div>
    )
}

export default async function NavBar() {
const session = await getServerSession(options)
    return(
        <div className='flex flex-col bg-grey-100'>
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">YokYok Fried Chicken</h1>
            <nav>
              <ul className="flex space-x-6">
            <wrapper><Link href='/'>Home</Link></wrapper>
            <wrapper><Link href='/profile'>Profile</Link></wrapper>

            <wrapper><Link href='/cart'>Cart</Link></wrapper>

            {session && <Wrapper><Link href='/api/auth/signout'>sign out</Link></Wrapper>}
            {/*แสดงเมนู Sign In หากยังไม่ได้เข้าระบบ*/}
            {!session && <Wrapper><Link href='/api/auth/signin'>sign in</Link></Wrapper>}
            </ul>
            </nav>
          </div>
        </header>
        </div>
    )
}