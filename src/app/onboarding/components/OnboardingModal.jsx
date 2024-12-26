"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Educational categories
const categories = [
  {
    id: "mathematics",
    name: "Mathematics",
    image: "/maths.jpg",
  },
  {
    id: "science",
    name: "Science",
    image: "/science.jpg",
  },
  {
    id: "programming",
    name: "Programming",
    image: "/programming.jpeg",
  },
  {
    id: "literature",
    name: "Literature",
    image: "/literature.jpeg",
  },
  {
    id: "history",
    name: "History",
    image: "/history.jpeg",
  },
  {
    id: "languages",
    name: "Languages",
    image: "/music.jpeg",
  },
  {
    id: "art",
    name: "Art & Design",
    image: "/art.jpeg",
  },
  {
    id: "music",
    name: "Music",
    image: "/music.jpeg",
  },
  {
    id: "physics",
    name: "Physics",
    image: "/entertainment.jpeg",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    image: "/literature.jpeg",
  },
  {
    id: "biology",
    name: "Biology",
    image: "/biology.jpeg",
  },
  {
    id: "technology",
    name: "Technology",
    image: "/technology.jpeg",
  },
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
];

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "in", label: "India" },
];

const OnboardingModal = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestToggle = (categoryId) => {
    setSelectedInterests((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : prev.length < 5
        ? [...prev, categoryId]
        : prev
    );
  };

  const handleNext = () => {
    if (step < 1) {
      setStep(step + 1);
    } else {
      onComplete?.({
        interests: selectedInterests,
      });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedInterests.length === 5;
      default:
        return true;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
    >
      <div
        className={cn(
          "relative w-[95%] lg:max-w-xl bg-white rounded-[20px] shadow-xl",
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
              className={`w-2 h-2 rounded-full ${
                dotIndex === step ? "bg-primary" : "bg-gray-300"
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
                    R
                  </div>
                </div>

                <div className='text-gray-600 text-sm'>rickkyray@gmail.com</div>

                <div className='space-y-2'>
                  <h1 className='text-xl font-bold font-manrope'>
                    Welcome to Tyndall
                    <br />
                    Rickkyray! ✨
                  </h1>
                  <p className='text-gray-600 text-sm px-8'>
                    Your answers to the next few questions will help us find the
                    right ideas for you
                  </p>
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
                    Pick at least 5 topics to customize your feed
                  </p>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[400px] overflow-y-auto pr-2'>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleInterestToggle(category.id)}
                      className={`relative rounded-xl overflow-hidden cursor-pointer group ${
                        selectedInterests.includes(category.id)
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

                      {selectedInterests.includes(category.id) && (
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
                <div className='text-center'>
                  <p className='text-sm text-gray-500 mb-4'>
                    Selected {selectedInterests.length} of 5 required topics
                  </p>
                </div>
              </div>
            )}

            <div className='mt-8'>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className='w-full bg-emerald-600  py-0 text-white'
              >
                {step === 1 ? "Complete Setup" : "Next"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OnboardingModal;
