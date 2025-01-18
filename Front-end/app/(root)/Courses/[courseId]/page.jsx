"use client";
import PaidCourse from "@/components/PaidCourse";
import { errorNotifcation } from "@/components/toast";
import UnpaidCourse from "@/components/UnpaidCourse";
import { getCourse, getReview } from "@/request/courses";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function page() {
  const { courseId } = useParams();
  const [refresh, setRefresh] = useState(null);
  const [data, setData] = useState(null);
  const [review, setReview] = useState([]);
  const route = useRouter();
  useEffect(() => {
    (async function () {
      const { status, data } = await getCourse(courseId);
      switch (status) {
        case 200:
          if (data.paid && data.course.progress?.for100 === 100) {
            route.push(`/Courses/final/${courseId}`);
            return;
          }
          setData(data);
          break;
        case 404:
          errorNotifcation(data.message);
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
  useEffect(() => {
    (async function () {
      const { status, data } = await getReview(courseId);
      console.log(data)
      switch (status) {
        case 200:
          setReview(data.reviews);
          break;
        case 204:
          setReview([]);
          break;
        case 10:
          console.log("dev bugs");
        default:
          console.log(data.message);
      }
    })();
  }, [refresh]);
  function finalPage() {
    route.push(`/Courses/final/${courseId}`);
  }
  if (data === null) return <Loading />;
  return (
    <div className="w-full min-h-[87vh]">
      {data.paid ? (
        <PaidCourse
          course={data.course}
          finalPage={finalPage}
          review={review}
        />
      ) : (
        <UnpaidCourse
          course={data.course}
          setRefresh={setRefresh}
          review={review}
        />
      )}
    </div>
  );
}

export default page;
