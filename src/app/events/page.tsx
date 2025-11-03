"use client";
import Hero from "@/features/home/hero"
import EventsPage from "@/features/events/components/EventsPage"

export interface Event {
  id: string;
  title: string;
  address: string;
  introduction: string;
  date?: string;
  time?: string;
  image?: string;
}

export const events: Event[] = [
  {
    id: "event1",
    title: "APMBC 2021",
    address: "123 Innovation Drive, Tech City, TC 12345",
    introduction: "Join us for an exciting day of technology discussions, networking, and innovation. This conference brings together industry leaders, developers, and tech enthusiasts to explore the latest trends in software development, AI, and digital transformation.",
    date: "March 15, 2024",
    time: "9:00 AM - 5:00 PM",
    image: "/placeholder.jpg"
  },
  {
    id: "event2", 
    title: "APMBC 2023",
    address: "456 Creative Avenue, Design District, DD 67890",
    introduction: "A hands-on workshop focused on modern design principles, user experience, and creative problem-solving. Perfect for designers, developers, and anyone interested in creating beautiful, functional interfaces.",
    date: "March 22, 2024",
    time: "10:00 AM - 4:00 PM",
    image: "/placeholder.jpg"
  },
  {
    id: "event3",
    title: "APMBC 2025",
    address: "789 Business Plaza, Startup Hub, SH 54321",
    introduction: "Connect with fellow entrepreneurs, investors, and startup enthusiasts. This networking event provides opportunities to share ideas, find potential partners, and learn from successful startup founders.",
    date: "March 29, 2024", 
    time: "6:00 PM - 9:00 PM",
    image: "/placeholder.jpg"
  }
];

export default function Events() {
  return (
    <main className="flex-grow">
      <Hero imageSrc="/banner/banner-about.jpeg" title="Events" />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <EventsPage />
        </div>
      </div>
    </main>
  )
}

