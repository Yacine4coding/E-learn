"use client";

import React, { useState } from "react";

import CourseCard from "@/components/CourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/CustomUI/tabs";

// Course banners (temporory)
import cours1 from "@/public/couseTest/Placeholder1.png";
import cours2 from "@/public/couseTest/Placeholder2.png";
import cours3 from "@/public/couseTest/Placeholder3.png";
import cours4 from "@/public/couseTest/Placeholder4.png";
import AnnounseNd from "@/components/promos/AnnounseNd";


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

const UserDashboard = () => {
  const [anounseVisibility, setAnounseVisibility] = useState(true);

  // Handle tab change visibility
  const handleTabChange = (tab) => {
    if (tab === "all-courses") {
      setAnounseVisibility(true);
    } else {
      setAnounseVisibility(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col mb-6">
      <main className="flex-1">
        <div className="container py-8 w-full flex flex-col justify-center items-center">
          <div className="mb-4">
            <h1 className="text-3xl font-bold font-gilroy">My Course</h1>
          </div>
          <Tabs
            defaultValue="all-courses"
            onValueChange={(value) => handleTabChange(value)} // Listen for tab changes
            className="w-[90%] flex flex-col justify-center items-center"
          >
            <TabsList>
              <TabsTrigger value="all-courses" className="font-gilroy font-bold text-sm">
                All Courses
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="font-gilroy font-bold text-sm">
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="completed" className="font-gilroy font-bold text-sm">
                Completed
              </TabsTrigger>
            </TabsList>

            {/* All courses */}
            <TabsContent value="all-courses" className="mt-6">
              <div className="mb-8 font-gilroy">
                <h1 className="text-2xl font-bold ">My Course</h1>
                <p className="text-gray-500 font-medium">List of your courses</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {courses.map((course, i) => (
                  <CourseCard
                    key={i}
                    creator={course.creator}
                    imageUrl={course.imageUrl}
                    progress={course.Progress}
                    totalLectures={course.TotalLecturs}
                    menuIcon={true}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Wishlist */}
            <TabsContent value="wishlist" className="mt-6">
              <div className="mb-8 font-gilroy">
                <h1 className="text-2xl font-bold ">Wishlist</h1>
                <p className="text-gray-500 font-medium">List of your favorite courses</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {courses.map((course, i) => (
                    <CourseCard
                      key={i}
                      creator={course.creator}
                      imageUrl={course.imageUrl}
                      progress={course.Progress}
                      totalLectures={course.TotalLecturs}
                      favIcon={true}
                    />
                  ))}
              </div>
            </TabsContent>

            {/* Completed */}
            <TabsContent value="completed" className="mt-6">
              <div className="mb-8 font-gilroy">
                <h1 className="text-2xl font-bold ">Completed</h1>
                <p className="text-gray-500 font-medium">List of your completed courses</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {courses.map((course, i) => (
                    <CourseCard
                      key={i}
                      creator={course.creator}
                      imageUrl={course.imageUrl}
                      progress={course.Progress}
                      totalLectures={course.TotalLecturs}
                      completIcon={true}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
        {anounseVisibility && (
          <AnnounseNd title={"Join Edulink and get amizing discount"} />
        )}
    </div>
  );
};

export default UserDashboard;
