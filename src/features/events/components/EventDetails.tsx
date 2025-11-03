import { Event } from "@/app/events/page";
import Image from "next/image";

interface EventDetailsProps {
  event: Event | null;
}

export default function EventDetails({ event }: EventDetailsProps) {
  if (!event) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">APMBC Events</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Welcome to the APMBC Events platform. Here you can explore our upcoming conferences and workshops focused on the seaweed industry, investment opportunities, and policy development. Our events bring together key stakeholders from around the world to collaborate on practical solutions for the marine biotechnology sector.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Investment Industry and Policy Forum</h2>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  The Forum will address many of the current issues farmers, industry, investors and governments are facing. How to scale the production, how to improve genetic selection from existing strains, what does it take to build local and national strategies to facilitate the biorefinery and the offtakes? How to avoid excessive fluctuations in the prices paid to seaweed farmers? Could we work on a central collection center, established either through cooperatives, farmer associations, private companies, or the government to help coordinate the marketing and trading and to monitor seaweed quality.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Attendees</h2>
              <div className="bg-white p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  50 key stakeholders are invited to work on practical solutions that could be implemented in the different part of the world to improve the seaweed industry from cultivation, biorefinery to end-user products. After an introduction from our partners and sponsors we will run 4 interactive round tables to discuss one precise topic. Each topic will be reported to the rest of the participants and will lead to discussion. The Workshop is a face-to-face event dedicated to catalytic group learning and collaboration building. It will focus on collaboration and actionable outcomes, using real business cases from the Blue Economy and a series of curated roundtables. Specifically, the workshop will hold space for active dialogues between four main types of marine conservation actors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{event.title}</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Event Details</h2>
            <div className="bg-white p-4 rounded-lg">
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <span className="ml-2 text-gray-600">{event.date}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Time:</span>
                  <span className="ml-2 text-gray-600">{event.time}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="ml-2 text-gray-600">{event.address}</span>
                </div>
                
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">About This Event</h2>
            <div className="bg-white p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{event.introduction}</p>
            </div>
            <div className="w-full">
                  <div className="w-full relative aspect-[4/1]">
                  <Image
                    src={event.image || ""}
                    alt={event.title}
                    fill
                    className="rounded-lg object-cover"
                    />
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
