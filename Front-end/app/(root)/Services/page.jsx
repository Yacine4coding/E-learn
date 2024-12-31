'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'

const srvs = [
  { 
    id: 1, 
    title: "Web Development", 
    description: "Create a responsive website", 
    difficulty: "expert",
    budget: "$5000",
    createdAt: "2023-06-01",
    location: "Remote",
    tags: ["web", "frontend", "backend"],
    proposals: 12
  },
  { 
    id: 2, 
    title: "Logo Design", 
    description: "Design a unique logo for your brand", 
    difficulty: "intermediate",
    budget: "$500",
    createdAt: "2023-06-02",
    location: "New York, NY",
    tags: ["design", "branding"],
    proposals: 8
  },
  { 
    id: 3, 
    title: "Content Writing", 
    description: "Write engaging content for your blog", 
    difficulty: "entry-level",
    budget: "$100",
    createdAt: "2023-06-03",
    location: "London, UK",
    tags: ["writing", "blogging"],
    proposals: 5
  },
]

const Services = () => {

  const router = useRouter();

  const handlePostClick = () => {
    // Add functionality to redirect to a new page for service proposal
    // if the user is logged in, otherwise redirect to the Proposal page
    router.push("/Services/postService");
    // if the user is not logged in, show a signup prompt
  }

  return (
    <div className="grow container mx-auto p-4 font-gilroy my-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Available Services
      </motion.h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {srvs.map((srv, index) => (
          <motion.div 
            key={srv.id} 
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{srv.title}</h3>
              <p className="text-gray-600 mb-4">{srv.description}</p>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Badge className='bg-green-500 text-white font-gilroy font-semibold capitalize'>{srv.difficulty}</Badge>
                  <span className="text-sm font-medium text-green-600">{srv.budget}</span>
                </div>
                <div className="text-sm text-gray-500">
                  <span>{srv.location}</span> • <span>{srv.createdAt}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {srv.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className='font-gilroy' >{tag}</Badge>
                ))}
              </div>
              <Link href={`/Services/Service/${srv.id}`}>
                <Button className="w-full bg-green-500 text-white">View Details</Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* <Link href="/Services/postService"> */}
          <Button size="lg" onClick={handlePostClick} className="w-full font-semibold font-gilory bg-green-500 text-white">Post a New Service</Button>
        {/* </Link> */}
      </motion.div>
    </div>
  )
}

export default Services