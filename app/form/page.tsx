// components/GoogleSignupForm.js
'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar'
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { permanentRedirect } from 'next/navigation'
const googleAuth = new GoogleAuthProvider()
import { useRouter } from 'next/navigation'



const form = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const login = async () => {
  
    const result = await signInWithPopup(auth, googleAuth)
    if (result) {
      console.log(result)
      router.push("/importcsv")
    }
  
  }
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Add your form submission logic, such as sending data to the server
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      {/* <Navbar/> */}
      <div className='flex flex-row max-md:flex-col justify-around items-center mt-60 max-md:mt-32 text-white'>
        <Image src="/form.png" alt="" width={500} height={500} />
        <form onSubmit={handleSubmit} className="max-w-md mr-12 max-md:mr-0 mt--25 flex flex-col items-center justify-center  ">

           <div className="flex items-center ">
            <img src="/assets/vitapLogo.png" alt="" className="self-center w-20 h-17 full mx-1" />
            <span><h2 className='font-bold text-white text-2xl	'>Certificate<br />Generator</h2></span>
          </div> 
          {/*<div className="mb-4 my-1 mt-100 color:black">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
          <div className="mb-4 mt-10">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
          <div className="mb-4 mt-10">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
          <div className="mb-4 mt-10">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div> */}
          <div className='flex justify-center items-center w-[100%]'>
            <button
              onClick={login}
              className="w-full bg-transparent   text-white font-bold    p-[1px] rounded-xl mt-10 bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3] "
              style={{}}
            >
             <div className="flex items-center gap-4 bg-black rounded-xl px-16 py-2"><img src="/icons8-google.svg" alt="" width={30} height={30}/><p>Sign up with Google</p></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default form;
