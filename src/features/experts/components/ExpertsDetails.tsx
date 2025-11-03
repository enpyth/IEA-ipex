"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import expertsData from "@/app/data/prod.json";
import tagsData from "@/app/data/index_en.json";

interface Profile {
  website: string;
  full_name: string;
  title: string;
  org_unit: string;
  telephone?: string;
  email?: string;
  brief_introduction?: string;
  orcid?: string;
  tag_ids?: Array<{
    tag_id: number;
    sub_id?: string[];
  }>;
  university?: string; // 添加大学名称字段
  profileIndex?: number; // 添加索引用于生成唯一 ID
}

interface ExpertsDetailsProps {
  tagId: number | null;
}

// 生成专家唯一 ID（使用大学名称和索引，更可靠）
function generateExpertId(universityKey: string, index: number): string {
  const universityPart = universityKey.toLowerCase().replace(/\s+/g, '-').replace(' tag', '').replace(/[^a-z0-9-]/g, '');
  return `${universityPart}-${index}`;
}

export default function ExpertsDetails({ tagId }: ExpertsDetailsProps) {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedTagName, setSelectedTagName] = useState<string>("All Experts");

  useEffect(() => {
    // 从所有大学数据中提取所有专家
    const allProfiles: Profile[] = [];
    
    Object.entries(expertsData).forEach(([universityKey, university]: [string, any]) => {
      if (university.cleaned_profiles && Array.isArray(university.cleaned_profiles)) {
        // 从键名中提取大学名称（移除 " tag" 后缀）
        const universityName = universityKey.replace(' tag', '');
        university.cleaned_profiles.forEach((profile: Profile, index: number) => {
          allProfiles.push({
            ...profile,
            university: universityKey, // 保存完整的键名，包括 " tag"
            profileIndex: index
          });
        });
      }
    });

    // 根据选中的标签过滤
    let filteredProfiles: Profile[] = [];
    
    if (tagId === null) {
      filteredProfiles = allProfiles;
      setSelectedTagName("All Experts");
    } else {
      // 只使用主标签（tag_id）进行过滤，不考虑子标签
      filteredProfiles = allProfiles.filter((profile) => {
        if (!profile.tag_ids || !Array.isArray(profile.tag_ids)) {
          return false;
        }
        return profile.tag_ids.some((tag) => tag.tag_id === tagId);
      });
      
      // 获取标签名称
      const tag = (tagsData as any[]).find((t) => t.id === tagId);
      setSelectedTagName(tag ? tag.name : `Tag ${tagId}`);
    }

    setProfiles(filteredProfiles);
  }, [tagId]);

  const handleCardClick = (profile: Profile) => {
    if (profile.university && profile.profileIndex !== undefined) {
      const expertId = generateExpertId(profile.university, profile.profileIndex);
      router.push(`/experts/${encodeURIComponent(expertId)}`);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{selectedTagName}</h1>
        
        {profiles.length === 0 ? (
          <div className="bg-white p-6 rounded-lg">
            <p className="text-gray-700">No experts found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile, index) => {
              const expertId = profile.university && profile.profileIndex !== undefined
                ? generateExpertId(profile.university, profile.profileIndex)
                : `expert-${index}`;
              
              return (
                <Card 
                  key={expertId}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCardClick(profile)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{profile.full_name || "N/A"}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {profile.title || ""}
                    </CardDescription>
                    <CardDescription className="text-xs text-gray-500">
                      {profile.org_unit || ""}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

