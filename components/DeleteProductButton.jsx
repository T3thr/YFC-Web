'use state'
import { useState } from 'react'
import { mutate } from 'swr'

export default function DeleteProductButton({product}) {
  
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  function openModal() { 
    setShowModal(true) 
    document.body.style.overflow = 'hidden'
  }
  
  function closeModal() { 
    setShowModal(false) 
    document.body.style.overflow = ''
  }
  
  async function deleteProduct() {
    setIsLoading(true)
    
    await fetch(`/api/products/${product.productSKU}`, {
      method: 'DELETE',
      body: JSON.stringify({
        productSKU: product.productSKU,
      })
    })
    
    mutate('/api/products')
    
    closeModal()
    setIsLoading(false)
  }
  return (
    <>
      <button 
        onClick={openModal} 
        className='w-24 sm:w-16 lg:w-14 px-2 py-1 text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-sm shadow-md mx-2'
      >
        Delete
      </button>

      {showModal && (
      <div className="fixed z-50 inset-0 flex items-center justify-center" >
        
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity" ></div>
        
        <div className="inline-block bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle w-4/5 sm:w-1/2 lg:w-1/3">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" >
                            ยืนยันการลบสินค้า {product.productName}
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                คุณแน่ใจจะลบสินค้าหรือไม่ การลบสินค้าจะไม่สามารถ Undo ได้
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                
                <button className="w-full inline-flex justify-center rounded-sm border border-transparent shadow-sm px-3 py-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-base font-medium  sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={deleteProduct}
                    disabled={isLoading}
                >
                    {isLoading ?'Deleting':'Delete'}
                </button>
                
                <button  className="mt-3 w-full inline-flex justify-center rounded-sm border border-gray-300 shadow-sm px-3 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </div>
      </div>
      )}
    </>
  )
}
