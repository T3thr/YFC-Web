'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function CartPage() {
    const {data,status} = useSession()
    if(status === 'loading') {
        <div className='flex flex-col justify-start items-center mx-auto h-screen my-5'>
            <div className='text-2xl text-blue-500'>Loading...</div>
        </div>
    }
    if(status === 'unauthenticated') {
        return(
            <div className ='flex flex-col justify-start items-center mx-auto h-screen my-5'>
                <div className='text-3xl'>Please Sign In</div>
                <Link
                href={'api/auth/signin?callbackUrl=/'}
                className ='ring-blue-400 ring-1 text-blue-500 rounded-sm shadow-sm py-1 px-2 my-4'
                >
                    Sign Inn
                </Link>
            </div>
        )
    }
    if(status === 'authenticated') {
        const downloadList = [
            {title: 'JavaScript', link: 'https://www.google.com/'},
        ]
        return (
        <div>
            <div className='flex flex-col justify-start items-center mx-auto h-screen my-5'>
                <div className='text-2xl'>รายการ</div>
             </div>
             <div className='flex flex-col justify-start items-center mx-auto h-screen my-5'>
                {
                    downloadList.map((item, index)=>{
                        return <Link
                        key={index}
                        href={item.link}
                        className='text-line-600'
                        >{item.title}</Link>
                    })
                }
             </div>
        </div>
        )
    }
}