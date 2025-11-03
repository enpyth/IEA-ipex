"use client";

import { useState } from "react";
import { useIsSmallScreen } from "@/hooks/use-is-small-screen";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import ExpertsSidebar from "./ExpertsSidebar";
import ExpertsDetails from "./ExpertsDetails";

export default function ExpertsPage() {
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isSmallScreen = useIsSmallScreen();

  const handleTagSelect = (tagId: number | null) => {
    setSelectedTagId(tagId);
    // 在移动端选择标签后关闭 Sheet
    if (isSmallScreen) {
      setIsMobileFilterOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {isSmallScreen ? (
        // 移动端：顶部过滤器按钮 + Sheet
        <>
          <div className="w-full p-4 border-b border-gray-200 bg-white sticky top-0 z-40">
            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Categories
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto max-h-[80vh] overflow-y-auto p-0">
                <ExpertsSidebar 
                  selectedTagId={selectedTagId} 
                  onTagSelect={handleTagSelect} 
                />
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ExpertsDetails tagId={selectedTagId} />
          </div>
        </>
      ) : (
        // 桌面端：传统侧边栏布局
        <>
          <ExpertsSidebar 
            selectedTagId={selectedTagId} 
            onTagSelect={handleTagSelect} 
          />
          <ExpertsDetails tagId={selectedTagId} />
        </>
      )}
    </div>
  );
}


