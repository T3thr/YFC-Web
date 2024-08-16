import Link from 'next/link';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import HamburgerMenu from '../components/HamburgerMenu'; // Adjust the path as needed
import styles from '@/app/styles/navbar.module.scss'; // Adjust the path as needed

function Wrapper({ children }) {
  return (
    <div className='hover:ring-1 hover:ring-blue-400 text-blue-600 rounded-sm py-2 px-3 m-2 text-center'>
      {children}
    </div>
  );
}

export default async function NavBar() {
  const session = await getServerSession(options);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* โลโก้ทางซ้าย */}
        <div className="flex">
          <h1 className="text-3xl font-bold text-gray-800">Yok Yok Fried Chicken</h1>
        </div>

        {/* เมนู hamburger */}
        <HamburgerMenu session={session} />

        {/* เมนูทางขวา */}
        <div className="hidden lg:flex space-x-4">
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
