"use client"
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import React, { useState } from 'react'
import { categories } from '../config/constants'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

function ProfileDetails({ user }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState(user.email)
  const [selectedPreferences, setSelectedPreferences] = useState(user.preferences)

  const handleSubmit = () => {
    console.log({
      email,
      preferences: selectedPreferences
    })
    setModalOpen(false)
  }

  const togglePreference = (categoryId) => {
    if (selectedPreferences.includes(categoryId)) {
      setSelectedPreferences(selectedPreferences.filter(id => id !== categoryId))
    } else {
      if (selectedPreferences.length < 5) {
        setSelectedPreferences([...selectedPreferences, categoryId])
      }
    }
  }

  return (
    <div className='p-5'>
      <div style={{
        backgroundImage: `url(https://api.dicebear.com/9.x/shapes/svg?seed=${user.email})`
      }} className='bg-cover rounded-xl h-[200px] w-full opacity-70'>
      </div>
      <img src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.email}`} alt="" className='w-[120px] h-[120px] rounded-full cover aspect-square -translate-y-[60px] mx-10 border-[5px] border-[#1c1c1c]' />
      <div className="flex w-full">
        <div className="-mt-[60px] flex w-full">
          <div>
            <h1 className='text-2xl font-bold'>{user.name}</h1>
            <p className="text-sm">{user.email}</p>
          </div>
          <div className="flex-1"></div>
          <div>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogTrigger asChild>
                <Button><Edit /> Edit Profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm">Email</label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="text-sm">Fields (Max 5)</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {categories.map(category => (
                        <Button
                          key={category.id}
                          variant={selectedPreferences.includes(category.id) ? "default" : "default-outline"}
                          onClick={() => togglePreference(category.id)}
                          className="border border-[#555]"
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleSubmit} className="w-full">Save Changes</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="border rounded-lg p-3 mt-3 border-[#555]">
        <div className="text-xl font-semibold">Fields</div>
        <div className="flex flex-wrap gap-3 my-3">
          {categories.map(category => {
            const has = user.preferences.find(p => p == category.id)
            return <Button key={category.id} variant={has ? "default" : "default-outline"} className="border border-[#555]">{category.name}</Button>
          })}
        </div>
        <div className="text-sm text-center">Maximum Fields: 5</div>
      </div>
    </div>
  )
}

export default ProfileDetails