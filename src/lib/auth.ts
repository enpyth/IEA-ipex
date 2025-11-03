import { createServerSupabaseClient } from './supabase-server'
import { redirect } from 'next/navigation'

export async function getSession() {
  const supabase = await createServerSupabaseClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getUserDetails() {
  const supabase = await createServerSupabaseClient()
  try {
    const { data: userDetails } = await supabase.auth.getUser()
    return userDetails
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function signOut() {
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error.message)
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/auth/sign-in')
  }
  return session
}
