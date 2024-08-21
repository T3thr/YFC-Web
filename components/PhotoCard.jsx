'use client'
import React , { useTransition } from 'react'
import Image from 'next/image'


const PhotoCard = ( { url , onClick } ) => {
    const [isPending, startTransition] = useTransition();

    const buttonStyle = {
        backgroundColor: 'red',
        color: '#fff', // Text color
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    };

    return (
        <div> 
            <div style = {{ border : '2px solid red', padding: 5 }}>
                <Image src = { url } alt = "image" width= {100} height= {60} priority />
            </div>

            <div className='flex flex-col items-center'>
                <button type = 'button' style={buttonStyle} onClick={() => startTransition(onClick)}>
                    {isPending ? 'Loading...' : 'ลบ'}
                </button>
            </div>
        </div>
    )

}

export default PhotoCard