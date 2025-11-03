"use client";

import { useState } from "react";
import EventsSidebar from "./EventsSidebar";
import EventDetails from "./EventDetails";
import { Event } from "@/app/events/page";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="flex h-full">
      <EventsSidebar 
        selectedEvent={selectedEvent} 
        onEventSelect={setSelectedEvent} 
      />
      <EventDetails event={selectedEvent} />
    </div>
  );
}
