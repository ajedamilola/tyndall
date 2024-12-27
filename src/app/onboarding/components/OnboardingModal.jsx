"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import SessionValidator from "@/app/components/sessionValidator";
import { categories } from "@/app/config/constants";
import { editUser, generateMoreArticles, getUserById } from "@/app/api/user/functions";
import { useRouter } from "next/navigation";
import { generateAIArticles } from "@/app/api/article/functions";
import { toast } from "sonner";

// Educational categories

const OnboardingModal = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const router = useRouter();


  SessionValidator({})
  const [form, setForm] = useState({
    email: " ",
    fields: [],
    name: " ",
    level: "beginner"
  })

  const handleInterestToggle = (categoryId) => {
    setForm((prev) =>
      prev.fields.includes(categoryId)
        ? { ...prev, fields: prev.fields.filter((id) => id !== categoryId) }
        : prev.fields.length < 5
          ? { ...prev, fields: [...prev.fields, categoryId], }
          : prev
    );
  };

  const [loading, setLoading] = useState(false)
  const handleNext = async () => {
    if (step < 1) {
      setStep(step + 1);
    } else {
      try {
        setLoading(true)
        const user = await editUser({
          preferences: form.fields,
          id: window.userId,
          name: form.name,
          level: form.level
        })
        await generateMoreArticles(window.userId)
        router.replace("/feed")
      } catch (error) {
        console.log(error)
        toast.error("Error while registering account. please try again")
      } finally {
        setLoading(false)
      }
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return form.fields.length <= 5 && form.fields.length > 0;
      default:
        return true;
    }
  };
  const [initLoading, setInitLoading] = useState(true)
  useEffect(() => {
    setInitLoading(true)
    setTimeout(async () => {
      const data = await getUserById(window.userId)
      if (data && data.preferences.length > 0) {
        return router.replace("/feed")
      }
      setForm({ ...form, email: data.email, name: data.email.split("@")[0] })
      setInitLoading(false)
    }, 200)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-[#1c1c1c]'
    >
      <div
        className={cn(
          "relative w-[95%] lg:max-w-xl bg-gray-100 rounded-[20px] shadow-xl",
          {
            "lg:max-w-sm ": step === 0,
            "max-w-xl": step === 1,
          }
        )}
      >
        {/* Progress dots */}
        <div className='absolute top-4 left-0 right-0 flex justify-center gap-2'>
          {[0, 1].map((dotIndex) => (
            <div
              key={dotIndex}
              className={`w-2 h-2 rounded-full ${dotIndex === step ? "bg-primary" : "bg-gray-300"
                }`}
            />
          ))}
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className='p-6 pt-16'
          >
            {step === 0 && (
              <div className='flex flex-col items-center text-center space-y-4'>
                {/* Avatar with animated dots */}
                <div className='relative'>
                  <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-semibold'>
                    {form.name[0]?.toUpperCase()}
                  </div>
                </div>

                <div className='text-gray-600 text-sm'>{form.email}</div>

                <div className='space-y-2'>
                  {!initLoading ?
                    <>
                      <h1 className='text-xl font-bold font-manrope'>
                        Welcome to Tyndall
                        <br />
                        {form.name}! ✨
                      </h1>
                      <p className='text-gray-600 text-sm px-8'>
                        Your answers to the next few questions will help us find the
                        right ideas for you
                      </p>
                    </>
                    :
                    <div className="text-center">Loading...</div>
                  }
                </div>
              </div>
            )}

            {step === 1 && (
              <div className='space-y-6'>
                <div className='text-center'>
                  <h2 className='text-2xl font-bold font-manrope'>
                    What are you interested in learning?
                  </h2>
                  <p className='text-gray-500'>
                    Pick at least 1 topics to customize your feed (Max 5)
                  </p>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[400px] overflow-y-auto pr-2'>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleInterestToggle(category.id)}
                      className={`relative rounded-xl overflow-hidden cursor-pointer group ${form.fields.includes(category.id)
                        ? "ring-2 ring-primary"
                        : ""
                        }`}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className='w-full h-[130px] object-cover'
                      />

                      <div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors' />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <span className='text-white font-medium'>
                          {category.name}
                        </span>
                      </div>

                      {form.fields.includes(category.id) && (
                        <div className='absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center'>
                          <svg
                            className='w-4 h-4 text-white'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path d='M5 13l4 4L19 7' />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <Select onValueChange={level => {
                    setForm({ ...form, level })
                  }} value={form.level}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Level</SelectLabel>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediary">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className='text-center'>
                  <p className='text-sm text-gray-500 mb-4'>
                    Selected {form.fields.length} of 5 required topics
                  </p>
                </div>
              </div>
            )}

            <div className='mt-8'>
              <Button
                onClick={handleNext}
                disabled={!canProceed() || loading}
                className='w-full bg-teal-700 hover:border-teal-800  py-2 text-white'
              >
                {step === 1 ? "Complete Setup" : "Next"}
              </Button>
              <div className="text-sm text-center">
                {loading && "Please wait while we generate your feed..."}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OnboardingModal;
