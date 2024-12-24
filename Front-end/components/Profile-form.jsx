'use client'

import avatarAccount from '@/public/avatars/avatar2.png'

import { useState } from 'react'
import Image from 'next/image'
import { Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ProfileForm = () => {

  const [profileImage, setProfileImage] = useState(avatarAccount);

  const [formData, setFormData] = useState({
    firstName: 'Yacine',
    lastName: 'Bensidahmed',
    headline: 'Hello world!',
    language: 'ar',
    link: 'https://yacine4coding.github.io/Portfolio/',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#3EDAD8] overflow-hidden">
              <Image
                src={profileImage}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Change Avatar  */}
            {/* <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full"
              onClick={() => document.getElementById('profileImageInput').click()}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            /> */}

          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={formData.firstName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={formData.lastName} onChange={handleInputChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" value={formData.headline} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input id="link" value={formData.link} onChange={handleInputChange} />
          </div>

          <Button type="submit" className="w-full bg-[#3EDAD8] hover:bg-[#35c2c1] text-white">
            Save
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ProfileForm

