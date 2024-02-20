import { CustomButton } from '@/components'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <div className="logo flex items-center px-2 lines space-x-0">
        <img src="/download.jpeg" alt="Logo" className="max-h-10 " />
        <h1>Certificate<br/>Generator</h1>
      </div>
      <div className='flex items-center px-2 lines space-x-0'>

      </div>
      
      <div className="links space-x-20">
        <a href="#" className="hover:underline mx-15">About</a>
        <a href="#" className="hover:underline mx-8">Content</a>
      </div>

    </div>
     <div>
     <Link href={'/form'}><div className="min-h-screen flex items-center justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click me
      </button>
    </div></Link>
     </div>
     

    </>
  )
}

export default page