"use client";
import PaidCourse from "@/components/PaidCourse";
import { errorNotifcation } from "@/components/toast";
import UnpaidCourse from "@/components/UnpaidCourse";
import { getCourse } from "@/request/courses";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function page() {
  const { courseId } = useParams();
  const [refresh , setRefresh]= useState(null)
  const [data, setData] = useState(null);
  useEffect(() => {
    (async function () {
      const { status, data } = await getCourse(courseId);
      switch (status) {
        case 200:
          setData(data);
          break;
        case 404:
          errorNotifcation(data.message)
          console.log(data.message);
          break;
        case 500:
          console.log(data.message);
          break;
        case 10:
          console.log("dev bugs");
      }
    })();
  }, [refresh]);
  if (data === null) return <Loading/>;
  return (
    <div className="w-full min-h-[87vh]">
      {data.paid ? (
        <PaidCourse course={data.course} />
      ) : (
        <UnpaidCourse course={data.course} setRefresh={setRefresh}/>
      )}
    </div>
  );
}

export default page;
