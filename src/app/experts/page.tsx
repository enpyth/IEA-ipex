"use client";
import Hero from "@/features/home/hero"
import ExpertsPage from "@/features/experts/components/ExpertsPage"

export default function Experts() {
  return (
    <main className="flex-grow">
      <Hero imageSrc="/banner/banner-about.jpeg" title="Experts" />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ExpertsPage />
        </div>
      </div>
    </main>
  )
}


