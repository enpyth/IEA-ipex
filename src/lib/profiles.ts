import { createServerSupabaseClient } from './supabase-server'
import { Profile, ProfileUpdateData } from '@/types/database'

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

export async function updateProfile(userId: string, updates: ProfileUpdateData): Promise<Profile | null> {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating profile:', error)
    return null
  }

  return data
}

export async function createProfile(profile: Omit<Profile, 'id'> & { id?: string }): Promise<Profile | null> {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()

  if (error) {
    console.error('Error creating profile:', error)
    return null
  }

  return data
}

export async function getUserProfile(userId: string): Promise<Profile | null> {
  let profile = await getProfile(userId)
  
  if (!profile) {
    // If profile doesn't exist, create a default one
    const defaultProfile = {
      id: userId,
      role: 'visitor' as const,
      email: '', // This will be filled from auth user
      points: 0,
      full_name: null,
      birthday: null
    }
    
    profile = await createProfile(defaultProfile)
  }
  
  return profile
}
