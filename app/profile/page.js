import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { OPTIMIZED_FONT_PROVIDERS } from 'next/dist/shared/lib/constants'
import Link from 'next/link'

export default async function NavBar(){
  const session = getServerSession(OPTIMIZED_FONT_PROVIDERS)
  if(session && session.user) {
    return (
      <div className='flex flex-col justify-start items-center mx-auto h-screen my-5'>
        <div className='text-3xl'>{session.user?.name}</div>
        <div className='text-2xl' text-grey-500>{session.user?.email}</div>
        <Link
        href={'api/auth/signout?callbackUrl=/profile'}
        className ='bg-blue-400 text-white rounded-sm shadow-sm py-1 px-2 my-4'
        >
          Sign Out
        </Link>
      </div>
    )
  }
  return (
    <div className='flex flex-col justify-start items-center mx-auto h-screen my-5'>
      <div className='text-3xl'>Hello</div>

    </div>
  )
}

