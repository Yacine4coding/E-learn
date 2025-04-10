"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import "@/styles/globals.css"; // Ensure the path to your CSS is correct
import logo from "../public/logo.png"; // Ensure the path to your logo is correct
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "/components/ui/avatar";

import avtr from '@/public/avatars/avatar.png'

// backend
import axios from 'axios';

const Navbar = () => {

  const [isLoged, setIsLoged] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state

  const router = useRouter();

  // loged off handlers

  const handleLoginClick = () => {
    console.log("Login");
    // router.push("/auth/Login");
    setIsLoged(true);
    setIsOpen(false);
  };

  const handleSignupClick = () => {
    console.log("Sign Up");
    router.push("/auth/Signup");
    setIsOpen(false);
  };

  const handleInstructorClick = () => {
    console.log("Become Instructor");
    router.push("/Instructor");
  };

  // loged in handlers

  const handleProfileClick = () => {
    console.log("My Profile");
    router.push("/profile");
  };

  const handleLogoutClick = () => {
    console.log("Logout");
    setIsLoged(false);
  };


  // const checkLoginStatus = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3001/user/isLoggin');

  //     if (response.data.isLoggedIn) {
  //       setIsLoged(true); // Set loged in state
  //       setUser(response.data.user); // Store user data
  //     }
  //     // else {
  //     //   router.push('/auth/Login'); // Redirect to login page if not logged in
  //     // }
  //   } catch (error) {
  //     console.error('Error checking login status:', error);
  //     // router.push('/login'); // Redirect to login page on error
  //   } finally {
  //     setLoading(false); // Stop loading
  //   }
  // };

  // useEffect(() => {
  //   checkLoginStatus();
  // }, [router]);

  // if (loading) return <p>Loading...</p>;


  const OffnavItems = [
    { label: "Login", onClick: handleLoginClick },
    { label: "Sign Up", onClick: handleSignupClick },
    { label: "Become Instructor", onClick: handleInstructorClick },
  ];

  const OnNavItems = [
    { label: "My Profile", onClick: handleProfileClick },
    { label: "Log out", onClick: handleLogoutClick },
    { label: "Become Instructor", onClick: handleInstructorClick },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex justify-between font-gilroy items-center py-4 px-6 bg-transparent">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image src={logo} alt="logo image" height={43} width={43} />
        <span className="ml-2 text-lg text-white font-extrabold">Edulink</span>
      </div>

      {/* Desktop Navigation */}

      <div className="hidden md:flex items-center justify-end">
            
            {isLoged? (
                  <>
                    <span
                      className='mr-4 text-base font-normal text-white cursor-pointer hover:text-gray-300 hoverTransition'
                      onClick={OnNavItems[2].onClick}
                    >
                      {OnNavItems[2].label}
                    </span>
                    <button
                      className="nrmlBnt hoverTransition"
                      onClick={OnNavItems[1].onClick}
                    >
                      {OnNavItems[1].label}
                    </button>
                    <Avatar className="cursor-pointer" onClick={handleProfileClick}>
                      <AvatarImage src='../public/avatars/avatar.png' />
                      <AvatarFallback>YB</AvatarFallback>
                    </Avatar>
                  </>
                
              ):(
                  <>
                    <span
                      className='mr-4 text-base font-normal text-white cursor-pointer hover:text-gray-300 hoverTransition'
                      onClick={OnNavItems[2].onClick}
                    >
                      {OffnavItems[2].label}
                    </span>
                    <button
                      className="nrmlBnt hoverTransition"
                      onClick={OffnavItems[0].onClick}
                    >
                      {OffnavItems[0].label}
                    </button>
                    <button
                      className="greenBtn hoverTransition"
                      onClick={OffnavItems[1].onClick}
                    >
                      {OffnavItems[1].label}
                    </button>
                  </>
              )
              }
        </div>



      {/* Mobile Navigation */}
      
      <div className="md:hidden flex items-center">
      {isLoged? (
                  <>
                  <button className="p-2 rounded" onClick={toggleMenu}>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/nutlope.png" />
                      <AvatarFallback>YB</AvatarFallback>
                    </Avatar>
                  </button>
                  {isOpen && (
                    <div className="absolute top-20 right-4 bg-white shadow-md p-4 rounded transition-all duration-300 ease-in-out">
                      {OnNavItems.map((item, index) => (
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
                </>
                
              ):(
                  <>
                    <button className="p-2 rounded" onClick={toggleMenu}>
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
                        {OffnavItems.map((item, index) => (
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
                  </>
              )
            }
            </div>

    </nav>
  )
};

export default Navbar;
