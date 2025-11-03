"use client";

import { useEffect, useState } from "react";
import tagsData from "@/app/data/index_en.json";

interface Tag {
  id: number;
  name: string;
}

interface ExpertsSidebarProps {
  selectedTagId: number | null;
  onTagSelect: (tagId: number | null) => void;
}

export default function ExpertsSidebar({ selectedTagId, onTagSelect }: ExpertsSidebarProps) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    setTags(tagsData as Tag[]);
  }, []);

  return (
    <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 h-full md:h-auto">
      <div className="p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
        <nav className="space-y-2">
          <button
            onClick={() => onTagSelect(null)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTagId === null
                ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            All Experts
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagSelect(tag.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTagId === tag.id
                  ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}


