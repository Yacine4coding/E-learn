"use client"

import { useState } from 'react';
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"


import Image from 'next/image';
import googleLogo from "@/public/google.svg"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const route = useRouter();



  const isButtonDisabled = !email || !password;

  const handleRememberMe = (e) => {
    setRememberMe(e);
    // Add your remember-me logic here
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your sign-in logic 
    console.log("login with email");
    console.log(email, password);
    route.push('/auth/UserChoice');
  };

  const handleGoogleclick = () => {
    console.log("login with google");
  };




  return (
    <div className="max-w-lg mx-auto flex flex-col items-center justify-around bg-white rounded-lg h-[90vh] ">
      <div className='text-center'>
        <h1 className="text-3xl leading-8 text-[#111111] font-gilroy font-medium mt-8">Welcome back</h1>
        <p className="text-sm leading-8 font-gilroy text-[#111111]">Don’t have an account?
          <Link href='/auth/Signup' className='underline hover:text-black'>
            Sign up
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 w-full h-[70%]">
        <div className='text-[#666666]'>
          <Label htmlFor="email" className="font-normal font-gilroy text-base">Email address</Label>
          <Input
            className="rounded-xl text-base h-[45px] p-4"
            placeholder="Enter you Email address"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='text-[#666666]'>
          <div className="flex flex-row justify-between items-start">
            <Label htmlFor="password" className="font-normal font-gilroy text-base">Password</Label>

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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p className='text-sm font-normal font-gilroy text-right'>
            <Link href='/auth/ForgotPassword' className='underline text-[#111111] hover:text-[#666666] hoverTransition'>
            Forgot your password
            </Link>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"  
            checked={rememberMe}
            onCheckedChange={handleRememberMe}
          />
          <label
            htmlFor="terms"
            className="text-sm font-normal font-gilroy leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Button 
          type="submit" 
          variant="secondary" 
          className="w-full rounded-[40px] font-gilroy font-medium p-6 bg-[#111111] text-white text-xl disabled:opacity-50 hover:opacity-90 hoverTransition"
          disabled={isButtonDisabled}
          >
          Log in
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

export default Login