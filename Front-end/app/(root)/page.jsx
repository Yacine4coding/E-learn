"use client";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Announse from "@/components/promos/AnnounseSt";
import Upcoming from "@/components/Upcoming";
import GetStarted from "@/components/GetStarted";
import Image from "next/image";
import heroPic from "@/public/hero.png";
import Trending from "@/components/Trending";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDashboard } from "@/request/user";
import { initMyCourses } from "@/redux/dashboard";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      const { status, data } = await getDashboard();
      if (status === 200) {
        dispatch(initMyCourses(data.courses));
      }
    })();
  }, []);
  return (
    <div className="relative overflow-x-hidden">
      {/* Hero background container */}
      <div className="relative h-[350px] w-full">
        {/* Hero image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroPic || "/placeholder.svg"}
            alt="Hero"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#1B1B1B] opacity-80"></div>
        </div>

        {/* Content container */}
        <div className="container relative mx-auto h-full">
          <Hero />
        </div>
      </div>

      {/* Rest of the content */}
      <div className="container mx-auto">
        <Courses />
        {/* <Trending /> */}
        <Announse title="Join Edulink now to get 35% off" />
        <Upcoming />
        <GetStarted />
      </div>
    </div>
  )
}

