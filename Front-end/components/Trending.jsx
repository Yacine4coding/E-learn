"use client";
import BigCard from "./BigCard";
import CourseCard from "./CourseCard";

import { bestCourses } from "@/request/courses";
import { useEffect, useState } from "react";

const Trending = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    (async function () {
      const { status, data } = await bestCourses(2);
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
    <div>
      <h2 className="text-2xl font-bold text-center mt-8 font-gilroy">
        Trending Courses
      </h2>
      <div className="flex flex-row justify-between-items-center my-12 w-full px-16 mx-auto">
        <BigCard />
        <div className="flex flex-row items-start justify-center flex-wrap gap-4 w-[55%]">
          {courses.map((course, i) => (
            <CourseCard
              key={i}
              title={course.title}
              creator={course.username}
              description={course.description}
              imageUrl={course.picture} // This should be correctly handled in the CourseCard component
              price={course.ammount}
              stars={course.stars.count} // Hardcoded value
              view={course.view.count} // Hardcoded value
              oldPrice={course.discount}
              courseId={course.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
