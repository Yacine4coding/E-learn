"use client";
import Hero from "@/components/Hero";
import Search from "@/components/Search";
import Courses from "@/components/Courses";
import Announse from "@/components/promos/Announse";
import Trending from "@/components/Trending";
import Upcoming from "@/components/Upcoming";

import GetStarted from "@/components/GetStarted";

import Image from "next/image";
import heroPic from "@/public/hero.png";
import { useEffect, useState } from "react";
import { bestCourses } from "@/request/courses";

export default function Home() {
  const [courses, setCourses] = useState([]);
  console.log(courses);
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
    <div className="overflow-x-hidden">
      <div className="block absolute -z-10 inset-0">
        <Image
          src={heroPic}
          alt="Hero"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="absolute -z-10 inset-0 bg-[#1B1B1B] opacity-70"></div>
      <Hero />
      <Search />
      <Courses courses={courses}/>
      <Announse />
      <Trending />
      <Upcoming />
      <GetStarted />
    </div>
  );
}
