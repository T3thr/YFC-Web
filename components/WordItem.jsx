'use client'

import React, {useState} from 'react'

export default function WordItem({ word, query }) {
    
    const index = word.word.toLowerCase().indexOf(query.toLowerCase());
    
    const [isOver, setIsOver] = useState(false)
    
    function mouseHandler() {
        
        setIsOver((prv) => !prv)
    }
    
    if (index !== -1) {
        
        return (
        <div  className='relative'>
            <div 
                
                onMouseOver={mouseHandler} 
                
                onMouseLeave={mouseHandler} 
                className='cursor-pointer text-center px-2 py-1'
            >
                {word.word}
            </div>
            {
            
            isOver && 
            <div  className='absolute mt-8 top-0 right-0 bg-gray-600 bg-opacity-80 text-white text-center text-xs rounded p-1 shadow-md w-16'>
                {word.meaning}
            </div>
            }
        </div>
        )
    } 
    
    return null
}
