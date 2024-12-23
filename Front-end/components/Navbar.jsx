"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import "@/styles/globals.css"; // Ensure the path to your CSS is correct
import logo from "../public/logo.png"; // Ensure the path to your logo is correct
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "/components/ui/avatar";
import { isLoggin, logOut } from "@/request/auth";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "@/redux/user";
import Link from "next/link";
const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isLoggin: isLoged } = useSelector((s) => s.user);
  const [isOpen, setIsOpen] = useState(false);

  const [Error, setError] = useState(""); // Store user data
  const [loading, setLoading] = useState(true); // Loading state

  const router = useRouter();
  useEffect(() => {
    (async function () {
      const {
        data: { userinfo },
        status,
      } = await isLoggin();
      switch (status) {
        case 200:
          dispatch(setState(userinfo));
          break;
        case 10:
          console.log(10);
          setError("catch error");
        case 500:
          setError(data.message);
          console.log(500);
      }
      setLoading(false);
    })();
  }, []);

  const handleLoginClick = () => {
    router.push("/auth/Login");
    setIsOpen(false);
  };
  const handleSignupClick = () => {
    router.push("/auth/Signup");
    setIsOpen(false);
  };
  const handleInstructorClick = () => {
    router.push("/Instructor");
  };

  // loged in handlers

  const handleProfileClick = () => {
    router.push("/dashboards/User");
  };

  const handleLogoutClick = async () => {
    await logOut();
    dispatch(setState(null));
    router.push("/");
  };

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

  if(loading){
    return <div className="w-full text-center mt-8 bg-white">Loading...</div>;
  }

  return (
    <nav className="flex justify-between font-gilroy items-center py-4 px-6 bg-[#405E93]">
      {/* Logo Section */}
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="logo image" height={43} width={43} />
        <span className="ml-2 text-lg text-white font-extrabold">Edulink</span>
      </Link>

      {/* Desktop Navigation */}

      <div className="hidden md:flex items-center justify-end">
        {isLoged ? (
          <>
            {!user.isteacher && (
              <span
                className="mr-4 text-base font-normal text-white cursor-pointer hover:text-gray-300 hoverTransition"
                onClick={OnNavItems[2].onClick}
              >
                {OnNavItems[2].label}
              </span>
            )}
            <button
              className="nrmlBnt hoverTransition"
              onClick={OnNavItems[1].onClick}
            >
              {OnNavItems[1].label}
            </button>
            <Avatar className="cursor-pointer" onClick={handleProfileClick}>
              <AvatarImage
                src={user.picture || "https://github.com/nutlope.png"}
              />
              <AvatarFallback>YB</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>
            <span
              className="mr-4 text-base font-normal text-white cursor-pointer hover:text-gray-300 hoverTransition"
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
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="md:hidden flex items-center">
        {isLoged ? (
          <>
            <button className="p-2 rounded" onClick={toggleMenu}>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user.picture || "https://github.com/nutlope.png"}
                />
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
        ) : (
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
