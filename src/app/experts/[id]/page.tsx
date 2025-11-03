"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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
}

export default function ExpertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [university, setUniversity] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const expertId = decodeURIComponent(params.id as string);
    
    // ID 格式: university-name-index (例如: southern-cross-university-0)
    // 从 ID 中提取索引（最后一个数字，可能有多位）
    const parts = expertId.split('-');
    let index: number | null = null;
    let indexStart = -1;
    
    // 从末尾向前查找，找到第一个全数字的部分作为索引
    for (let i = parts.length - 1; i >= 0; i--) {
      const part = parts[i];
      if (/^\d+$/.test(part)) {
        index = parseInt(part, 10);
        indexStart = i;
        break;
      }
    }
    
    if (index === null || indexStart === -1) {
      setLoading(false);
      return;
    }
    
    // 提取大学部分的 ID（索引之前的所有部分）
    const universityIdParts = parts.slice(0, indexStart);
    const universityId = universityIdParts.join('-');
    
    // 查找匹配的专家
    let foundProfile: Profile | null = null;
    let foundUniversity = "";
    
    Object.entries(expertsData).forEach(([universityKey, universityData]: [string, any]) => {
      // 生成大学部分的 ID
      const expectedUniversityId = universityKey.toLowerCase().replace(/\s+/g, '-').replace(' tag', '').replace(/[^a-z0-9-]/g, '');
      
      // 检查 ID 是否匹配大学名称
      if (universityId === expectedUniversityId) {
        if (universityData.cleaned_profiles && Array.isArray(universityData.cleaned_profiles)) {
          // 使用索引直接获取专家
          if (index >= 0 && index < universityData.cleaned_profiles.length) {
            foundProfile = universityData.cleaned_profiles[index];
            foundUniversity = universityKey.replace(' tag', '');
          }
        }
      }
    });

    setProfile(foundProfile);
    setUniversity(foundUniversity);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Expert Not Found</h1>
          <p className="text-gray-600 mb-4">The expert profile you are looking for does not exist.</p>
          <Button onClick={() => router.push('/experts')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Experts
          </Button>
        </div>
      </div>
    );
  }

  // 获取标签和子标签信息
  const getTagInfo = (tagId: number) => {
    return (tagsData as any[]).find(t => t.id === tagId);
  };

  const getSubTagInfo = (tagId: number, subId: string) => {
    const tag = getTagInfo(tagId);
    if (tag && tag.subcategories) {
      return tag.subcategories.find((sub: any) => sub.id === subId);
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="space-y-6">
          {/* Name */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.full_name || "N/A"}</h1>
          </div>

          {/* Title */}
          {profile.title && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Title</h2>
              <p className="text-gray-600">{profile.title}</p>
            </div>
          )}

          {/* School/University */}
          {university && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">School</h2>
              <p className="text-gray-600">{university}</p>
            </div>
          )}

          {/* Organization Unit */}
          {profile.org_unit && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Organization Unit</h2>
              <p className="text-gray-600">{profile.org_unit}</p>
            </div>
          )}

          {/* Telephone */}
          {profile.telephone && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Telephone</h2>
              <p className="text-gray-600">{profile.telephone}</p>
            </div>
          )}

          {/* Email */}
          {profile.email && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Email</h2>
              <p className="text-gray-600">
                <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">
                  {profile.email}
                </a>
              </p>
            </div>
          )}

          {/* Website */}
          {profile.website && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Website</h2>
              <p className="text-gray-600">
                <a 
                  href={profile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {profile.website}
                </a>
              </p>
            </div>
          )}

          {/* Introduction */}
          {profile.brief_introduction && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Introduction</h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {profile.brief_introduction}
              </p>
            </div>
          )}

          {/* Tags & Sub-tags */}
          {profile.tag_ids && profile.tag_ids.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Research Tags</h2>
              <div className="space-y-4">
                {profile.tag_ids.map((tagItem, index) => {
                  const tagInfo = getTagInfo(tagItem.tag_id);
                  if (!tagInfo) return null;

                  return (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {tagInfo.name}
                      </h3>
                      {tagItem.sub_id && tagItem.sub_id.length > 0 && (
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium text-gray-700 mb-2">Subcategories:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {tagItem.sub_id.map((subId) => {
                              const subTagInfo = getSubTagInfo(tagItem.tag_id, subId);
                              return (
                                <li key={subId} className="text-sm text-gray-600">
                                  {subTagInfo ? subTagInfo.name : subId}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

