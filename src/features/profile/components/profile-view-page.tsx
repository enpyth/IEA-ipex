'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/contexts/AuthContext'
import { createClient } from '@/lib/supabase'
import { Profile } from '@/types/database'
import { useEffect, useState } from 'react'

export default function ProfileViewPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error fetching profile:', error)
          // Create default profile if it doesn't exist
          const defaultProfile = {
            id: user.id,
            role: 'visitor' as const,
            email: user.email || '',
            points: 0,
            full_name: user.user_metadata?.full_name || null,
            birthday: null
          }
          
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert(defaultProfile)
            .select()
            .single()

          if (createError) {
            console.error('Failed to create profile:', createError)
            return
          }
          
          setProfile(newProfile)
        } else {
          setProfile(data)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user, supabase])

  if (!user) {
    return (
      <div className="flex w-full flex-col p-4">
        <div className="text-center">
          <p className="text-muted-foreground">Please sign in to view your profile.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex w-full flex-col p-4">
        <div className="text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col p-4 space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Your profile information and account details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={profile?.full_name || 'Not set'}
                disabled
                className="bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={profile?.email || 'Not set'}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                value={profile?.role || 'Not set'}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label>Birthday</Label>
              <Input
                value={profile?.birthday || 'Not set'}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label>Points</Label>
              <Input
                value={profile?.points || '0'}
                disabled
                className="bg-muted"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Your account details and authentication information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>User ID</Label>
              <Input value={user.id} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Profile ID</Label>
              <Input value={profile?.id || 'N/A'} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Created At</Label>
              <Input 
                value={user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'} 
                disabled 
                className="bg-muted" 
              />
            </div>
            <div className="space-y-2">
              <Label>Last Sign In</Label>
              <Input 
                value={user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'} 
                disabled 
                className="bg-muted" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
