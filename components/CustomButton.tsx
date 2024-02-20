// components/CustomButton.js
import Image from 'next/image';
import React, { MouseEventHandler } from 'react';
interface CustomButtonProps{
    label:string;
    onClick?:MouseEventHandler
    buttonStyles?:string
    rightIcon?:string
    textStyle?:string
}


const CustomButton = ({ label, onClick, buttonStyles, rightIcon, textStyle}:CustomButtonProps) => {
  return (
    <button
    className={buttonStyles}
    onClick={onClick}>
    <span className={textStyle}>{label}</span>
    {rightIcon && (
      <div className="relative w-6 h-6">
        <Image
        src={rightIcon}
        fill
        alt='right icon'
        className='object-contain'
        />
      </div>
    )}
  </button>
  );
};

export default CustomButton;
