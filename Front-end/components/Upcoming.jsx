"use client";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard"; // Ensure this component is correctly set up
import { bestCourses } from "@/request/courses";

const Upcoming = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    (async function () {
      const { status, data } = await bestCourses(3);
      switch (status) {
        case 10:
          console.log("10");
          break;
        case 204:
          console.log("204");
          break;
        case 200:
          setCourses(data.courses);
          console.log("200");
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
    <div className="w-full flex flex-col items-center p-[3em] mb-12 bg-white">
      <h1 className="text-2xl font-gilroy font-bold mb-8">Upcoming Webinar</h1>
      <div className="flex justify-around flex-wrap gap-2">
        {courses.map((course, i) => (
          <CourseCard
            key={i}
            title={course.title}
            creator={course.username}
            description={course.description}
            imageUrl={course.picture} // This should be correctly handled in the CourseCard component
            price={course.amount}
            stars={course.stars.count} // Hardcoded value
            view={course.view.count} // Hardcoded value
            oldPrice={course.discount}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
