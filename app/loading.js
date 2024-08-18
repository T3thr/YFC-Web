import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-screen mx-auto'>
        <div className="h-10 w-10 animate-spin rounded-full border-blue-500 border-t-4 border-l-4"></div>
    </div>
  )    
}