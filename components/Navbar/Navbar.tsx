

// import React from 'react';
// import { CustomButton } from '..';
// import Link from 'next/link';

// const Navbar = () => {


//   return (
//     <>
//       <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
//       <div className="logo flex items-center px-2 lines space-x-0">
//         <img src="/download.jpeg" alt="Logo" className="max-h-10 " />
//         <h1>Certificate<br/>Generator</h1>
//       </div>
//       <div className='flex items-center px-2 lines space-x-0'>

//       </div>

//       <div className="links space-x-20">
//         <a href="#" className="hover:underline">Home</a>
//         <a href="#" className="hover:underline mx-15">About</a>
//         <a href="#" className="hover:underline mx-8">Content</a>
//       </div>

//     </div>
//      <div>
//      <Link href={'/form'}><CustomButton label="Get Started" /></Link>
//      </div>

//     </>)}
//   //   <>
//   //     {/* <div className='navbar'>
//   //       <div className='logo'>
//   //         <img src="/download.jpeg"  alt="Logo" />
//   //         <div className="header">
//   //           <p>Certificate<br/>Generator</p>
//   //         </div>
//   //       </div>
//   //       <div className='links}'>
//   //         <a href="#">Link 1</a>
//   //         <a href="#">Link 2</a>
//   //         <a href="#">Link 3</a>
//   //       </div>
//   //     </div>
//   //   </>
//   // ); */}


// export default Navbar;
import Image from 'next/image'
import React from 'react';
import Link from 'next/link';
import { CustomButton } from '..';
import './Navbar.css'
const Navbar = () => {


  return (
    <>
      <header className="text-gray-400 bg-black body-font bg-transparent">
        <div className="container mx-auto flex flex-wrap p-16 flex-col md:flex-row items-center bg-transparent">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <Image width={50} height={50} src="/download.jpeg" alt="" />
            <span className="ml-3 text-xl font-bold	">Cerficate Generator</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base font-bold	 justify-center">
            <a className="ml-10 hover:text-white">Home</a>
            <a className="ml-10 hover:text-white">About</a>
            <a className="ml-10 hover:text-white">Contact</a>
          </nav>
        </div>
      </header>
      <div className='flex flex-col gap-8 h-[100%]' >
        <div className="text-8xl max-sm:text-6xl font-black	 flex flex-col justify-center items-center my-40 text-white bg-transparent">
          <h1>
            Certificate
          </h1>
          <h1 className="    indent-96 max-md:indent-40 max-sm:indent-12">
            Generator
          </h1>
        </div>

        <div className='name bg-transparent flex max-md:justify-center justify-end mr-24 max-sm:mr-0   ' >
          <Link href={'/form'}><CustomButton label="Get Started   &#8599;" buttonStyles="      bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3] text-white font-black	 py-4 px-10 rounded   " textStyle='flex gap-2 text-black 	 text-[14px] leading-[17px] font-black	' /></Link>
        </div>
      </div>

    </>
  );
};

export default Navbar;
