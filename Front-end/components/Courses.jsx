import React from "react";
import CourseCard from "./CourseCard";
import cours1 from "@/public/couseTest/Placeholder1.png";
import cours2 from "@/public/couseTest/Placeholder2.png";
import cours3 from "@/public/couseTest/Placeholder3.png";
import cours4 from "@/public/couseTest/Placeholder4.png";
const cours = [
  {
    title: "Introduction to Web Development",
    creator: "John Doe",
    imageUrl: cours1,
    price: 49.99,
    stars: 4.5,
    view: 1200,
    oldPrice: 79.99,
  },
  {
    title: "Mastering Python Programming",
    creator: "Jane Smith",
    imageUrl: cours2,
    price: 39.99,
    stars: 4.7,
    view: 1500,
    oldPrice: 59.99,
  },
  {
    title: "Data Science and Machine Learning",
    creator: "Alice Johnson",
    imageUrl: cours3,
    price: 69.99,
    stars: 4.8,
    view: 2200,
    oldPrice: 89.99,
  },
  {
    title: "Digital Marketing Essentials",
    creator: "Bob Lee",
    imageUrl: cours4,
    price: 29.99,
    stars: 4.2,
    view: 800,
    oldPrice: 49.99,
  },
];

const Courses = ({ courses = false }) => {
  
  return (
    <div className="w-full flex flex-col items-center pt-[8em] p-[3em] bg-white">
      <h1 className="text-2xl font-gilroy font-bold mb-8">
        Browse Our Top Courses
      </h1>
      <div className="flex justify-around flex-wrap gap-2">
        {cours.map((crs, i) => (
          <CourseCard
            key={i}
            title={crs.title}
            creator={crs.creator}
            imageUrl={crs.imageUrl} // This should be correctly handled in the CourseCard component
            price={crs.price}
            stars={crs.stars} // Hardcoded value
            view={crs.view} // Hardcoded value
            oldPrice={crs.oldPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
