"use client";

import { useState } from "react";
import ExpertsSidebar from "./ExpertsSidebar";
import ExpertsDetails from "./ExpertsDetails";

export default function ExpertsPage() {
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);

  return (
    <div className="flex h-full">
      <ExpertsSidebar 
        selectedTagId={selectedTagId} 
        onTagSelect={setSelectedTagId} 
      />
      <ExpertsDetails tagId={selectedTagId} />
    </div>
  );
}


