
"use client"

import { useState } from 'react';
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";

import Image from 'next/image';
import googleLogo from "@/public/google.svg"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


import Link from 'next/link';
import { useRouter } from 'next/navigation';
import avatar from '@/public/avatars/avatar.png'
// backend
import axios from 'axios';

const Signup = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isteacher: false,
    picture: "avatar.png",
  });

  const [showPassword, setShowPassword] = useState(false);
  
  const route = useRouter();


  const handleGoogleclick = () => {
    console.log("login with google");
  };


  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/user/signup', formData);
      setMessage(`Signup successful! Welcome, ${response.data.user.username}`);
      route.push("/auth/UserChoice");

    } catch (error) {
      if (error.response) {
        // Handle specific errors based on status code
        switch (error.response.status) {
          case 400:
            setMessage('Invalid email format.');
            break;
          case 409:
            setMessage('Email already exists.');
            break;
          case 422:
            setMessage('All inputs are required.');
            break;
          case 500:
            setMessage('Internal server error');
            break;
          default:
            setMessage('Something went wrong. Please try again.');
        }
      } else {
        setMessage('Server unreachable.');
      }
    }finally{
      setLoading(false);
    }
  };


  return (
      <div className="max-w-lg mx-auto flex flex-col items-center justify-around bg-white rounded-lg h-[90vh] ">
        <div className='text-center'>
          <h1 className="text-3xl leading-8 text-[#111111] font-gilroy font-medium mt-8">Create an account</h1>
          <p className="text-sm leading-8 font-gilroy text-[#111111]">Already have an account?
            <Link href='/auth/Login' className='underline hover:text-black'>
              Login
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 w-full h-[70%]">
          {/* <div className='text-[#666666]'>
            <Label htmlFor="username" className="font-normal font-gilroy text-base">What should we call you?</Label>
            <Input
              className="rounded-xl text-base h-[45px] p-4"
              placeholder="Enter your profile name"
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div> */}
          <div className='text-[#666666]'>
            <Label htmlFor="email" className="font-normal font-gilroy text-base">What's your email?</Label>
            <Input
              className="rounded-xl text-base h-[45px] p-4"
              placeholder="Enter you Email address"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='text-[#666666]'>
            <div className="flex flex-row justify-between items-start">
              <Label htmlFor="password" className="font-normal font-gilroy text-base">Create a password</Label>

              <div className="w-18">
              {showPassword 
                ? ( 
                  <button
                    type="button"
                    className="flex flex-row justify-between items-center w-full text-gray-500 hoverTransition hover:text-gray-900"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    <VisibilityOffIcon fontSize="small" className='pr-1'/> 
                    <span className='text-md font-gilroy'>Hide</span>
                  </button>
                )
                : ( 
                  <button
                    type="button"
                    className="flex flex-row justify-between items-center w-full text-gray-500 hoverTransition hover:text-gray-900"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    <VisibilityIcon fontSize="small" className='pr-1'/> 
                    <span className='text-md font-gilroy'>Show</span>
                  </button>
                )
              }
              </div>
            </div>
            <Input
              className="rounded-xl text-base h-[45px] px-4"
              placeholder="Enter your password"
              id="password"
              type={showPassword? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <p className='text-sm font-normal font-gilroy text-[#666666]'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
          </div>
          {message && <p>{message}</p>}
          <Button 
            type="submit" 
            variant="secondary" 
            className="w-full rounded-[40px] font-gilroy font-medium p-6 bg-[#111111] text-white text-xl disabled:opacity-50 hover:opacity-90 hoverTransition"
            disabled={loading}
            >
            {loading ? 'Creating an account...' : 'Create an account'}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleGoogleclick}
            className="w-full border-2 border-[#333333] bg-white rounded-[40px] font-gilroy font-medium p-6 text-[#111111] text-xl hover:bg-gray-200 hoverTransition">
            <Image
              src={googleLogo}
              alt='google logo'
              width="24"
              height="24"
            />
            Continue with Google 
          </Button>
        </form>
      </div>
  );
}

export default Signup
