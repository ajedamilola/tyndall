"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingModal from "./components/OnboardingModal";

export default function page() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const router = useRouter();

  const handleOnboardingComplete = (data) => {
    console.log("Onboarding completed with data:", data);
    setShowOnboarding(false);
    router.push("/feed");
  };

  return (
    <main className='min-h-screen bg-gray-100'>
      {showOnboarding && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}
    </main>
  );
}
