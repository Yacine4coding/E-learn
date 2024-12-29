"use client";
import PaidCourse from "@/components/PaidCourse";
import UnpaidCourse from "@/components/UnpaidCourse";
import { getCourse } from "@/request/courses";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    (async function () {
      const { status, data } = await getCourse(courseId);
      switch (status) {
        case 200:
          setData(data);
          break;
        case 404:
          console.log(data.message);
          break;
        case 500:
          console.log(data.message);
          break;
        case 10:
          console.log("dev bugs");
      }
    })();
  }, []);
  if (data === null) return <div>loading</div>;
  return (
    <div className="w-full min-h-[87vh]">
      {data.paid ? (
        <PaidCourse course={data.course} />
      ) : (
        <UnpaidCourse course={data.course} />
      )}
    </div>
  );
}

export default page;
