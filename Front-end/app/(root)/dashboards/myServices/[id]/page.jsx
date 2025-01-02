'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// This would typically come from a database
const services = [
  { 
    id: 1, 
    title: "Web Development", 
    description: "Create a responsive website", 
    difficulty: "expert",
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
    difficulty: "intermediate",
    budget: "$500",
    createdAt: "2023-06-02",
    location: "New York, NY",
    tags: ["design", "branding"],
    proposals: [
      { id: 3, name: "Alex Johnson", email: "alex@example.com", message: "I've designed logos for several startups and can provide samples." },
    ]
  },
]

const ServiceDetail = ({ params }) => {
  const service = services.find(s => s.id === parseInt(params.id))
  const [approvedProposal, setApprovedProposal] = useState(null)

  if (!service) {
    notFound()
  }

  const handleApprove = (proposalId) => {
    setApprovedProposal(proposalId)
    // Here you would typically update the database
    console.log(`Approved proposal ${proposalId} for service ${service.id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold mb-8"
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
        <p className="text-xl mb-4">{service.description}</p>
        <div className="flex flex-wrap gap-4 mb-4">
          <Badge variant="secondary">{service.difficulty}</Badge>
          <span className="text-green-600 font-semibold">{service.budget}</span>
          <span>{service.location}</span>
          <span>{service.createdAt}</span>
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
        <h2 className="text-2xl font-semibold mb-4">Proposals ({service.proposals.length})</h2>
        <div className="space-y-4">
          {service.proposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{proposal.name}</h3>
                  <p className="text-gray-600 mb-2">{proposal.email}</p>
                  <p className="mb-4">{proposal.message}</p>
                  {approvedProposal === proposal.id ? (
                    <Badge variant="success">Approved</Badge>
                  ) : (
                    <Button 
                      onClick={() => handleApprove(proposal.id)}
                      disabled={approvedProposal !== null}
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

