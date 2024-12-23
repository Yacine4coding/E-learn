"use client"
import React from "react";
import CourseCard from "./CourseCard";
import cours1 from "@/public/couseTest/Placeholder1.png";
import cours2 from "@/public/couseTest/Placeholder2.png";
import cours3 from "@/public/couseTest/Placeholder3.png";
import cours4 from "@/public/couseTest/Placeholder4.png";

import { useEffect, useState } from "react";
import { bestCourses } from "@/request/courses";
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

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    (async function () {
      const { status, data } = await bestCourses(5);
      switch (status) {
        case 10:
          console.log("10");
          break;
        case 204:
          console.log("204");
          break;
        case 200:
          setCourses(data.courses);
          console.log("204");
          break;
        case 400:
          console.log("400");
          console.log(data);
          break;
        case 500:
          console.log("500");
          console.log(data);
          break;
      }
    })();
  }, []);
  return (
    <div className="w-full flex flex-col items-center pt-[8em] p-[3em] bg-white">
      <h1 className="text-2xl font-gilroy font-bold mb-8">
        Browse Our Top Courses
      </h1>
      <div className="flex justify-around flex-wrap gap-2">
        {cours.map((course, i) => (
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
  );
};

export default Courses;
