

import BigCard from "./BigCard"
import CourseCard from "./CourseCard"

import cours1 from "@/public/couseTest/Placeholder1.png"
import cours2 from "@/public/couseTest/Placeholder2.png"
import cours3 from "@/public/couseTest/Placeholder3.png"
import cours4 from "@/public/couseTest/Placeholder4.png"

const courses = [
  {
    title: "Introduction to Web Development",
    creator: "John Doe",
    imageUrl: cours1,
    price: 49.99,
    stars: 4.5,
    view: 1200,
    oldPrice: 79.99,
    description: "Learn the fundamentals of web development, including HTML, CSS, and JavaScript, to kickstart your career as a web developer."
    
  },
  {
    title: "Mastering Python Programming",
    creator: "Jane Smith",
    imageUrl: cours2,
    price: 39.99,
    stars: 4.7,
    view: 1500,
    oldPrice: 59.99,
    description: "A comprehensive guide to Python programming, covering everything from basics to advanced concepts with hands-on examples."
    
  },
  {
    title: "Data Science and Machine Learning",
    creator: "Alice Johnson",
    imageUrl: cours3,
    price: 69.99,
    stars: 4.8,
    view: 2200,
    oldPrice: 89.99,
    description: "Dive into data science and machine learning with this course, featuring practical projects and real-world applications."
    
  },
  {
    title: "Digital Marketing Essentials",
    creator: "Bob Lee",
    imageUrl: cours4,
    price: 29.99,
    stars: 4.2,
    view: 800,
    oldPrice: 49.99,
    description: "Master the essentials of digital marketing, including SEO, social media strategies, and content marketing to grow your brand."
  }
];



const Trending = () => {
  return (
    <div>
        <h2 className="text-2xl font-bold text-center mt-8 font-gilroy">Trending Courses</h2>
        <div className="flex flex-row justify-between-items-center my-12 w-full px-16 mx-auto">
            <BigCard />
            <div className="flex flex-row items-start justify-center flex-wrap gap-4 w-[55%]">
            {
                courses.map((course, i) => (
                <CourseCard
                    key={i}
                    title={course.title}
                    creator={course.creator}
                    description={course.description}
                    imageUrl={course.imageUrl} // This should be correctly handled in the CourseCard component
                    price={course.price}
                    stars={course.stars} // Hardcoded value
                    view={course.view} // Hardcoded value
                    oldPrice={course.oldPrice}
                />
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default Trending