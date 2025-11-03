"use client";

import { useState } from "react";
import { events, Event } from "@/app/events/page";

interface EventsSidebarProps {
  selectedEvent: Event | null;
  onEventSelect: (event: Event | null) => void;
}

export default function EventsSidebar({ selectedEvent, onEventSelect }: EventsSidebarProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Events</h2>
        <nav className="space-y-2">
          <button
            onClick={() => onEventSelect(null)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedEvent === null
                ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            Introduction
          </button>
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => onEventSelect(event)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedEvent?.id === event.id
                  ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {event.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
