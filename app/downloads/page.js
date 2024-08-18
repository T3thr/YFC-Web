'use client'

// อิมพอร์ตฟังก์ชัน getServerSession เพื่อรับค่า session มาใช้งานในคอมโพเนนต์
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function DownloadsPage() {
  const {data, status} =  useSession()
  // ขณะกำลังเข้าสู่ระบบ หรือออกจากระบบ
  if(status === 'loading') {
    <div className='flex flex-col justify-start items-center mx-auto h-screen my-5'>
        <div className='text-2xl text-blue-500'>Loading...</div>
    </div>
  }
  // เมื่อออกจากระบบ
  if(status === 'unauthenticated') {
    return (
        <div className='flex flex-col justify-start items-center mx-auto h-screen my-5'>
            <div className='text-3xl'>Please Sign In!!!</div>
        </div>
    )
  }
  // เมื่อเข้าสู่ระบบเรียบร้อย
  if(status === 'authenticated') {
    const downloadList = [
        {title: 'JavaScript', link: 'https:www.thinkbeyondbook.com'},
        {title: 'Python', link: 'https:www.thinkbeyondbook.com'},
        {title: 'Next.js', link: 'https:www.thinkbeyondbook.com'},
        {title: 'SvelteKit', link: 'https:www.thinkbeyondbook.com'},
    ]
    return (
    <div>
        <div className="flex flex-col justify-start items-start w-2/6 mx-auto my-5">
            <div>รายการดาวน์โหลดสำหรับ {data.user?.name}</div>
        </div>
        <div className='flex flex-col justify-start items-start w-1/6 mx-auto h-screen my-5'>
        {
            downloadList.map((item, index)=>{
                return <Link 
                key={index} 
                href={item.link}
                className='text-lime-600'
                >{item.title}</Link>
            })
        }
        </div>
    </div>
    )
  }
}