
import React, { useState } from "react";
import { X, Facebook, Apple, Search, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleIcon from "@/components/GoogleIcon";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-[700px]  relative overflow-hidden flex flex-col md:flex-row">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 z-10"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Left side - Image */}
        <div className="md:w-1/2 bg-amber-500/20 relative hidden md:block ">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Kid coding" 
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-lg font-bold mb-1 select-none">Join Our Learning Community</h2>
            <p className="text-white/90 text-sm select-none">Start your journey to mastery today!</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="p-5 md:w-1/2">
          {/* Logo */}
          <div className="flex justify-center mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                <span className="font-bold text-sm">M</span>
              </div>
              <span className="ml-2 font-bold text-gray-800 text-sm">MyCourse.io</span>
            </div>
          </div>

          {/* Welcome text */}
          <div className="text-center mb-3">
            <h2 className="text-lg font-bold mb-1">Create an Account</h2>
            <p className="text-gray-600 text-xs">
              Join us and get more benefits. We promise to keep your data safely.
            </p>
          </div>

          {/* Social login buttons */}
          <div className="space-y-2 mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90 h-8 text-xs"
            >
              <Facebook size={14} />
              <span>Sign Up with Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-black/90 h-8 text-xs"
            >
              <Apple size={14} />
              <span>Sign Up with Apple</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 border-gray-300 h-8 text-xs"
            >
              <GoogleIcon />
              <span>Sign Up with Google</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="bg-white px-3 text-xs text-gray-500 absolute">or use email</span>
          </div>

          {/* Form */}
          <form>
            <div className="space-y-3">
              <div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 h-8 text-sm"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={14} />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 h-8 text-sm"
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <Button 
                type="button" 
                className="w-full bg-green-500 hover:bg-green-600 text-white h-8 text-xs"
              >
                Create Account
              </Button>
            </div>
          </form>

          {/* Sign in link */}
          <div className="text-center mt-3 text-xs">
            <span className="text-gray-600">Already have an Account?</span>{" "}
            <a href="#" className="text-green-500 hover:underline">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
