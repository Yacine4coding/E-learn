'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { useParams } from 'next/navigation'
import { errorNotifcation } from '@/components/toast'
import Loading from '@/app/(root)/Courses/[courseId]/Loading'
import { getServiceById } from '@/request/marketPlace'

// This would typically come from a database
const services = [
  { 
    id: 1, 
    title: "Web Development", 
    description: "Create a responsive website", 
    level: "expert",
    budget: "$5000",
    createdAt: "2023-06-01",
    location: "Remote",
    tags: ["web", "frontend", "backend"],
    proposals: [
      { id: 1, name: "John Doe", email: "john@example.com", message: "I have 5 years of experience in web development." },
      { id: 2, name: "Jane Smith", email: "jane@example.com", message: "I specialize in responsive design and can deliver in 2 weeks." },
    ]
  },
  { 
    id: 2, 
    title: "Logo Design", 
    description: "Design a unique logo for your brand", 
    level: "intermediate",
    budget: "$500",
    createdAt: "2023-06-02",
    location: "New York, NY",
    tags: ["design", "branding"],
    proposals: [
      { id: 3, name: "Alex Johnson", email: "alex@example.com", message: "I've designed logos for several startups and can provide samples." },
    ]
  },
]

const ServiceDetail = () => {

  const { id } = useParams();
  const [service,setService] = useState(null);
  useEffect(()=>{
    (async function () {
    const {status , data} = await getServiceById(id);
    switch (status) {
      case 200 : 
        setService(data.service)
        break; 
      case 404 : 
        notFound()
        break; 
      default :
      errorNotifcation(data.message);
    }
    })()
  },[id])
  const [approvedProposal, setApprovedProposal] = useState(null);

  if (!service) {
   return <Loading />
  }

  const handleApprove = (proposalId) => {
    setApprovedProposal(proposalId)
    // Here you would typically update the database
    console.log(`Approved proposal ${proposalId} for service ${service.id}`)
  }

  return (
    <div className="container font-gilroy mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {service.title}
      </motion.h1>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-md mb-4">{service.description}</p>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500 text-white font-gilroy font-semibold capitalize">
              {service.level}
            </Badge>
            <span className="text-sm font-medium text-green-600">
              {service.budget}
            </span>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            {service.location && (
              <>
                <span>{service.location}</span> •
              </>
            )}
            <span>{service.createdAt}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Proposals ({service.offers.length})</h2>
        <div className="space-y-4">
          {service.offers.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{proposal.user.username}</h3>
                  <p className="text-gray-600 mb-2">{proposal.user.email}</p>
                  <p className="mb-4">{proposal.message}</p>
                  {approvedProposal === proposal.id ? (
                    <Button disabled={true} className="bg-green-500 text-white text-bold" >Approved</Button>
                  ) : (
                    <Button
                      onClick={() => handleApprove(proposal.id)}
                      disabled={approvedProposal !== null}
                      className="hover:bg-green-500 hover:text-white hover:bg-green-400 hoverTransition" 
                    >
                      Approve
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ServiceDetail

