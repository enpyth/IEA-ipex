"use client";
import Hero from "@/features/home/hero"
import Register from "@/components/form/register"

export default function Membership() {
  return (
    <main className="flex-grow">
      <Hero imageSrc="/banner/banner-about.jpeg" title="Membership" />
      <Register />
    </main>
  )
}