
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, ShoppingCart, X, Facebook, Apple, Mail } from "lucide-react";
import SignInModal from "@/components/SignInModal";
import SignUpModal from "@/components/SignUpModal";

const Index = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleBrowseCourses = () => {
    setIsSignInModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header - Made smaller with reduced padding */}
      <header className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              <span className="font-bold text-sm">M</span>
            </div>
            <span className="ml-2 font-bold text-gray-800 text-sm">MyCourse.io</span>
          </div>
          
          <div className="hidden md:flex items-center relative max-w-md w-full">
            <Input 
              type="text" 
              placeholder="Search for course" 
              className="pr-8 h-8 text-sm"
            />
            <Search className="absolute right-3 h-3 w-3 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline-flex text-xs h-8 px-3">
            Become Instructor
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex h-8 w-8">
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsSignInModalOpen(true)}
            className="text-xs h-8 px-3"
          >
            Login
          </Button>
          <Button 
            className="bg-green-500 hover:bg-green-600 text-xs h-8 px-3"
            onClick={() => setIsSignUpModalOpen(true)}
          >
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-amber-500/60 to-yellow-500/60 py-20">
          <div className="container mx-auto px-6 flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-10 md:mb-0 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Learn something new everyday
              </h1>
              <p className="text-xl text-gray-800 mb-8">
                Become proficient in your desired skills
              </p>
              <div>
                <Button 
                  onClick={handleBrowseCourses} 
                  className="bg-white text-gray-800 hover:bg-gray-100"
                >
                  Browse Course
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              {/* This would be your code editor image */}
              <div className="rounded-lg shadow-lg overflow-hidden bg-gray-900 ml-auto max-w-md">
                <div className="h-6 bg-gray-800 flex items-center px-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-4 text-green-400 text-sm font-mono">
                  <div>// example code</div>
                  <div>function helloWorld() {"{"}</div>
                  <div>&nbsp;&nbsp;console.log("Welcome to MyCourse.io");</div>
                  <div>{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Section Preview */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Complete your Course Journey</h2>
          <p className="text-gray-600 mb-8">We know the best things happen when you try something new</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Web Development"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Web Development Bootcamp</h3>
                <p className="text-gray-600 text-sm mt-2">Learn modern web development with React, TypeScript and more</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Data Science"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Data Science Fundamentals</h3>
                <p className="text-gray-600 text-sm mt-2">Master data analysis, visualization and machine learning</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
                  alt="Mobile Development"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Mobile App Development</h3>
                <p className="text-gray-600 text-sm mt-2">Build cross-platform mobile apps with React Native</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
      
      {/* Sign Up Modal */}
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
