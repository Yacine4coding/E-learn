'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data (would typically come from a database)
const myServices = [
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
]

const MyServices = () => {
  return (
    <div className="w-[95%] md:w-[90%] max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <motion.h1 
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Posted Services
      </motion.h1>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myServices.map((service, index) => (
          <motion.div 
            key={service.id} 
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">{service.description}</p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs sm:text-sm">{service.difficulty}</Badge>
                  <span className="text-sm font-medium text-green-600">{service.budget}</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  <span>{service.location}</span> • <span>{service.createdAt}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {service.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs sm:text-sm">{tag}</Badge>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600">
                  {service.proposals} proposal{service.proposals !== 1 ? 's' : ''}
                </span>
                <Link href={`/dashboards/myServices/${service.id}`}>
                  <Button className="text-xs font-semibold font-gilory bg-green-500 text-white sm:text-sm py-1 sm:py-2 px-2 sm:px-4">
                    View Proposals
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MyServices
