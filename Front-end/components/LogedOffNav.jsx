"use client"


import React, { useState } from 'react'
import Image from 'next/image'


import "@/styles/globals.css"
import logo from '../public/logo.png';


const navItems = [
  { label: 'Login', onClick: () => console.log('Sign In') },
  { label: 'Sign Up', onClick: () => console.log('Sign Up') },
  { label: 'Become Instructor', onClick: () => console.log('Sign Up') },
];

const LogedOffNav = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prv) => !prv);
  };

  const handleLoginCLick = () => {
    console.log('Login')
  };

  const handleSignupCLick = () => {
    console.log('Sign Up')
  };

  const handleInstructorClick = () => {
    console.log('Sign Up')
  };


  return (
    <nav className="flex justify-between font-gilroy items-center py-4 px-6 bg-transparent">
      <div className="flex items-center">
        <Image 
          src={logo}
          alt='logo image'
          height={43}
          width={43}
        />
        <span className="ml-2 text-lg text-white font-extrabold">Edulink</span>
      </div>
      <div className="hidden md:flex items-center justify-end">
        <span
          className='mr-4 text-base font-normal text-white cursor-pointer hover:text-gray-300 hoverTransition'
          onClick={handleInstructorClick}
        >
          {navItems[2].label}
        </span>
        <button
          className="nrmlBnt hoverTransition"
          onClick={handleLoginCLick}
        >
          {navItems[0].label}
        </button>
        <button
          className="greenBtn hoverTransition"
          onClick={handleSignupCLick}
        >
          {navItems[1].label}
        </button>
      </div>


      <div className="md:hidden flex items-center">
        <button
          className="p-2 rounded"
          onClick={toggleMenu}
        >
          <svg
            className="text-white w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute top-20 right-4 bg-white shadow-md p-4 rounded transition-all duration-300 ease-in-out">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="block w-full py-2 px-4 text-left hover:bg-gray-100"
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default LogedOffNav