'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'


const Services = () => {

  const router = useRouter();
  const [services, setServices] = useState([]);
  useEffect(() => {
    (async function () {
      const { status, data } = await getServices();
      switch (status) {
        case 200:
          setServices(data.services);
          break;
        case 204:
          setServices(null);
          break;
        case 500:
          errorNotifcation(data.message);
          break;
        default:
          errorNotifcation("error with code 10");
      }
    })();
  }, []);
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
        {services.map((srv, index) => (
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
                  {srv.location && (
                    <>
                      <span>{srv.location}</span> •
                    </>
                  )}
                  <span>{srv.createdAt}</span>
                </div>
              </div>
              {srv.tags.length && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {srv.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="font-gilroy">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
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
          <Button size="lg" onClick={handlePostClick} className="w-full font-semibold font-gilory bg-green-500 hover:bg-green-300hoverTransition text-white">Post a New Service</Button>
        {/* </Link> */}
      </motion.div>
    </div>
  )
}

export default Services