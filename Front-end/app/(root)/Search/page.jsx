
"use client"

import { useState } from "react";

import CourseCard from "@/components/CourseCard";

import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input"
// Course banners (temporory)
import cours1 from "@/public/couseTest/Placeholder1.png";
import cours2 from "@/public/couseTest/Placeholder2.png";
import cours3 from "@/public/couseTest/Placeholder3.png";
import cours4 from "@/public/couseTest/Placeholder4.png";

const courses = [
  {
    title: "Introduction to Web Development",
    creator: "John Doe",
    imageUrl: cours1,
    price: 49.99,
    stars: 4.5,
    view: 1200,
    oldPrice: 79.99,
    TotalLecturs: 10,
    Progress: 4,
  },
  {
    title: "Mastering Python Programming",
    creator: "Jane Smith",
    imageUrl: cours2,
    price: 39.99,
    stars: 4.7,
    view: 1500,
    oldPrice: 59.99,
    TotalLecturs: 10,
    Progress: 4,
  },
  {
    title: "Data Science and Machine Learning",
    creator: "Alice Johnson",
    imageUrl: cours3,
    price: 69.99,
    stars: 4.8,
    view: 2200,
    oldPrice: 89.99,
    TotalLecturs: 10,
    Progress: 4,
  },
  {
    title: "Digital Marketing Essentials",
    creator: "Bob Lee",
    imageUrl: cours4,
    price: 29.99,
    stars: 4.2,
    view: 800,
    oldPrice: 49.99,
    TotalLecturs: 10,
    Progress: 4,
  },
  {
    title: "Digital Marketing Essentials",
    creator: "Bob Lee",
    imageUrl: cours4,
    price: 29.99,
    stars: 4.2,
    view: 800,
    oldPrice: 49.99,
    TotalLecturs: 10,
    Progress: 4,
  },
];
const Search = () => {

    const [searchStr, setSearchStr] = useState("");

    const searchParams = useSearchParams();
    const SrchStr = searchParams.get("query") || "";



    const handleSearchClick = () => {
        console.log("Search clicked with search string: ", searchStr);
    }

  return (
    <div className="container p-6 mx-auto">
        <div className="flex justify-around gap-5 mb-8">
            <Input 
                type="email" 
                placeholder="Find courses..."
                defaultValue={SrchStr}
                onChange={(e) => setSearchStr(e.target.value)}
              />
            <button 
            onClick={handleSearchClick}
            className="hoverTransition py-2 px-6 text-xs font-bold border-2 border-green-500 bg-green-500 text-white hover:bg-transparent hover:border-green-500 hover:text-green-500  rounded-2xl">Search</button>
        </div>
        <div className="mb-8 font-gilroy">
            <h1 className="text-2xl font-bold ">Search result</h1>
            <p className="text-gray-500 font-medium">
                We know the best things for You. Top picks for You.
            </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course, i) => (
                <CourseCard
                key={i}
                title={course.title}
                creator={course.creator}
                description={course.description}
                imageUrl={course.imageUrl} // This should be correctly handled in the CourseCard component
                price={course.price}
                stars={course.stars} // Hardcoded value
                view={course.view} // Hardcoded value
                oldPrice={course.oldPrice}
              />
            ))}
        </div>
    </div>
  )
}

export default Search