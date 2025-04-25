
import React, { useState } from "react";
import { X, Facebook, Apple, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleIcon from "@/components/GoogleIcon";

interface SignInModalProps { 
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="p-6">
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
          <div className="text-center mb-5">
            <h2 className="text-xl font-bold mb-1">Welcome Back</h2>
            <p className="text-gray-600 text-sm">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Social login buttons */}
          <div className="space-y-2 mb-5">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90 h-9 text-xs"
            >
              <Facebook size={14} />
              <span>Sign In with Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-500 h-9 text-xs"
            >
              <Apple size={14} />
              <span>Sign In with Apple</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 border-gray-300 h-9 text-xs"
            >
              <GoogleIcon />
              <span>Sign In with Google</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="bg-white px-3 text-xs text-gray-500 absolute">or use email</span>
          </div>

          {/* Form */}
          <form className="mb-4">
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 h-9 text-sm"
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
                    className="pr-10 h-9 text-sm"
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
                className="w-full bg-green-500 hover:bg-green-600 text-white h-9 text-xs"
              >
                Sign In
              </Button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="text-center mt-3 text-xs border-t border-gray-200 pt-3">
            <span className="text-gray-600">Don't have an Account?</span>{" "}
            <a href="#" className="text-green-500 hover:underline font-medium">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
