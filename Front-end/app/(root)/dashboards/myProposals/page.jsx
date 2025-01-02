'use client'

import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// This would typically come from a database
// This would typically come from a database
const myProposals = [
    { 
      id: 1,
      serviceId: 101,
      serviceTitle: "Web Development",
      serviceBudget: "$5000",
      message: "I have 5 years of experience in web development and can deliver a responsive website within your timeline.",
      submittedAt: "2023-06-05",
      status: "pending"
    },
    { 
      id: 2,
      serviceId: 102,
      serviceTitle: "Logo Design",
      serviceBudget: "$500",
      message: "I specialize in creating unique and memorable logos. I can provide initial concepts within 3 days.",
      submittedAt: "2023-06-07",
      status: "approved",
      approvedAt: "2023-06-10",
      clientMessage: "We love your portfolio. Let's discuss the project details."
    },
    { 
      id: 3,
      serviceId: 103,
      serviceTitle: "Content Writing",
      serviceBudget: "$100",
      message: "I'm a professional content writer with expertise in SEO. I can deliver high-quality articles that engage readers and improve your search rankings.",
      submittedAt: "2023-06-10",
      status: "rejected"
    }
  ]

const MyProposals = () => {
  return (
    <div className="container font-gilroy mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Proposals
      </motion.h1>
      <div className="space-y-6">
        {myProposals.map((proposal, index) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{proposal.serviceTitle}</h3>
                    <p className="text-sm text-gray-500">Submitted on {proposal.submittedAt}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-green-600 font-semibold mb-2">{proposal.serviceBudget}</span>
                    <Badge 
                      variant={
                        proposal.status === 'approved' ? 'success' : 
                        proposal.status === 'rejected' ? 'destructive' : 
                        'secondary'
                      }
                      className={`capitalize font-gilroy font-semibold text-xs ${proposal.status === 'approved' ? 'bg-green-500 text-white' : proposal.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-500 text-gray-100'}`}
                    >
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-700">{proposal.message}</p>
                {proposal.status === 'approved' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-50 border border-green-200 rounded p-4 my-4"
                  >
                    <p className="text-green-800 font-semibold mb-2">Approved on {proposal.approvedAt}</p>
                    <p className="text-green-700 mb-2">{proposal.clientMessage}</p>
                    <p className="text-green-700">You will be contacted via email shortly to complete the service arrangement. Please check your inbox for further instructions.</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MyProposals

