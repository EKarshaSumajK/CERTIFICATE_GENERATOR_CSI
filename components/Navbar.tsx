import Image from 'next/image'
import React from 'react';
import { CustomButton } from '.';
import Link from 'next/link';

const Navbar = () => {
    

  return (
<header className="text-gray-400 bg-black body-font bg-transparent">
        <div className="container mx-auto flex flex-wrap p-16 flex-col md:flex-row items-center bg-transparent">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <Image width={50} height={50} src="/download.jpeg" alt="" />
            <span className="ml-3 text-xl">Cerficate Generator</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="ml-10 hover:text-white">Home</a>
            <a className="ml-10 hover:text-white">About</a>
            <a className="ml-10 hover:text-white">Contact</a>
          </nav>
        </div>
      </header>
  );
};

export default Navbar;
