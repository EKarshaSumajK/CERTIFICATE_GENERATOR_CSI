"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addimage } from '../Commonstuff/user';
import { useRouter } from 'next/navigation';
import Icon from "./imagecertificate.svg"
import "./hid.css"
const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const router = useRouter();
  

  const handleFileUpload = (e) => {
    e.target.files[0] ? setImage(e.target.files[0]) : setImage(null);
    dispatch(addimage(e.target.files[0]));
  }
  const fileInputRef = useRef<HTMLInputElement>(null);
   

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  


  return (
    <div>
      <div className=' mt-40'>

        <div className="flex flex-col	justify-center	items-center	">
          <h1
            style={{ fontWeight: 500 }}
            className="mt-20 text-white text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
          >
            Please Import your Certificate File Here
          </h1>
          <br /><br /><br />
          <div className=" top-[35%] bg-transparent borderGradient w-4/5 md:w-5/6 xl:w-full">
            <div className="innerBorder grid place-items-center bg-transparent" onClick={handleClick} id="drop-area">
              <Image width={201} height={201} src={Icon.src} className="bg-transparent" alt="" />
              <div className='bg-transparent'>
                <p className="mt-5" id="file-info">
                  Click or Drop your Certificate Here
                </p>
                <input className='bg-transparent visuallyhidden'
                  type="file"
                  id="file-input"
                  accept="image/*"
                  ref={fileInputRef}

                  onChange={handleFileUpload}

                />
                <div id="error-message" />
              </div>
            </div>
          </div>
          {image != null && (
            <div className="grid place-items-center">
              <h1
                style={{ fontWeight: 500 }}
                className="mt-20 text-white text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
              >
                <div className="w-full h-full">
                  <img src={URL.createObjectURL(image)} alt="Uploaded" className='w-[80%] h-[80%]' />
                </div>
              </h1>
              <br/><br/>
              <div className="bottom-[5%] left-[40vw] pt-4 pb-4 pl-11 pr-11 rounded-[12px] text-[#121212] bg-gradient-to-r from-[#58D7FC] to-[#F8FFA3]">
                <Link href="/edit">
                  <button type="button">Import Your Template</button>
                </Link>
                
              </div>
              <br/><br/>
            </div>
          )}


        </div>
      </div>
    

    </div>
  )
}


export default ImageUpload;


