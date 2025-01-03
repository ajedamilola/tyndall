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
import { Loading } from 'notiflix'
import { editUser } from '../api/user/functions'
import { toast } from 'sonner'

function ProfileDetails({ user, setUser }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState(user.name)
  const [selectedPreferences, setSelectedPreferences] = useState(user.preferences)
  const [level, setLevel] = useState(user.level || "beginner")

  const handleSubmit = async () => {
    const data = {
      name,
      preferences: selectedPreferences,
      level
    }
    Loading.standard("Saving Changes")
    const u = await editUser({ id: user.superTokenId, ...data })
    if (u) {
      setUser(u)
    } else {
      toast.error("Unable to update user data please try again")
    }
    Loading.remove()
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
            <p className="text-sm">Level: {user.level || "Beginner"}</p>
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
                    <label className="text-sm">Username</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="text-sm">Level</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["beginner", "intermediate", "expert"].map((lvl) => (
                        <Button
                          key={lvl}
                          variant={level === lvl ? "default" : "default-outline"}
                          onClick={() => setLevel(lvl)}
                          className="border border-[#555]"
                        >
                          {lvl[0].toUpperCase()}{lvl.slice(1)}
                        </Button>
                      ))}
                    </div>
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
                  <div className="text-sm">Note: Changing preferences might trigger a regeneration of feed</div>
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