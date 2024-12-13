import Hero from "@/components/Hero";
import Search from "@/components/Search";
import Courses from "@/components/Courses";
import Announse from "@/components/promos/Announse";
import Trending from "@/components/Trending";
import Upcoming from "@/components/Upcoming";

import GetStarted from "@/components/GetStarted";

import Image from "next/image";
import heroPic from "@/public/hero.png";

export default function Home() {

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
      <Courses/>
      <Announse />
      <Trending />
      <Upcoming />
      <GetStarted />
    </div>
  );
}
