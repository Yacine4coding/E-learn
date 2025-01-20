import Hero from "@/components/Hero";
import Search from "@/components/Search";
import Courses from "@/components/Courses";
import Announse from "@/components/promos/AnnounseSt";
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
          layout="fill"
          objectFit="cover"
          quality={100}
          className="w-full h-full"
        />
      </div>
      <div className="absolute -z-10 inset-0 bg-[#1B1B1B] opacity-70"></div>
      <div className="container mx-auto">
        <Hero />
        <Search />
        <Courses />
        <Announse title="Join Edulink now to get 35% off" />
        {/* <Trending /> */}
        <Upcoming />
        <GetStarted />
      </div>
    </div>
  );
}
