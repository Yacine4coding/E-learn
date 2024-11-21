




import Hero from "@/components/Hero";
import Search from "@/components/Search";
import Courses from "@/components/Courses";
import Announse from "@/components/promos/Announse";
import Trending from "@/components/Trending";
import Upcoming from "@/components/Upcoming";

import Image from 'next/image'
import heroPic from "@/public/hero.png"

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
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="absolute -z-10 inset-0 bg-[#1B1B1B] opacity-70"></div>
      <Hero />
      <Search />
      <Courses />
      <Announse />
      <Trending />
      <Upcoming />
      <section className="bg-[#FFEC8A] flex items-center justify-center h-[170px] flex-col ">
        <h1 className="text-2xl font-gilroy font-bold mb-8">Get personal learning recommendations based on your needs</h1>
        <button className="px-8 py-2 text-base rounded-lg font-gilroy font-bold text-[#1B1B1B] border-2 border-[#1B1B1B] opacity-60 bg-transparent hover:bg-[#1B1B1B] hover:text-[#FFEC8A] hoverTransition">Get Started</button>
      </section>
    </div>
  );
}
