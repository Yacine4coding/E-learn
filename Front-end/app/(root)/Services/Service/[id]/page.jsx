'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import React, { useState, useEffect } from 'react'

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

const ServicePage = ({ params }) => {
    const [serviceId, setServiceId] = useState(null);

    useEffect(() => {
        params.then((unwrappedParams) => {
            setServiceId(parseInt(unwrappedParams.id));
        });
    }, [params]);

    if (serviceId === null) {
        return <div>Loading...</div>;
    }

    const service = services.find(s => s.id === serviceId);

    if (!service) {
        notFound();
    }

    async function applyForService(formData) {
        // Here you would typically save the application to a database
        console.log('Application received:', Object.fromEntries(formData));
    }

    return (
        <div className="min-w-[600px] mx-auto font-gilroy my-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Badge className='bg-green-500 text-white font-gilroy font-semibold capitalize'>{service.difficulty}</Badge>
                            <span className="text-sm font-medium text-green-600">{service.budget}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span>{service.location}</span> • <span>{service.createdAt}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {service.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-green-500 capitalize font-gilroy">{tag}</Badge>
                        ))}
                    </div>
                    <div className="text-sm text-gray-600 font-gilroy">
                        <span className="font-semibold">{service.proposals}</span> proposal{service.proposals !== 1 ? 's' : ''} received
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-2xl font-semibold mb-4 font-gilroy">Apply for this Service</h2>
                <form action={applyForService} className="space-y-4 font-gilroy">
                    <input type="hidden" name="serviceId" value={service.id} />
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <Input type="text" id="name" name="name" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                        <Input type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <Textarea id="message" name="message" required />
                    </div>
                    <Button type="submit" className="w-full bg-green-500 text-white">Submit Application</Button>
                </form>
            </motion.div>
        </div>
    );
}

export default ServicePage;