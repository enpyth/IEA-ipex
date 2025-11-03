# Supabase Authentication Implementation Guide

## Overview
This document outlines the implementation of user authentication using Supabase for the IEA Expert frontend application. The authentication system will support:
- Google OAuth (Social Login)
- Email Link Authentication (Passwordless)
- User session management
- Protected routes

## Prerequisites

### 1. Supabase Project Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Note down your project URL and anon public key
3. Configure authentication providers in Supabase Dashboard

### 2. Environment Variables
Create `.env.local` file in your project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Implementation Steps

### Step 1: Install Dependencies
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Step 2: Create Supabase Client Configuration
Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for API routes
export const createServerSupabaseClient = () => {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
```

### Step 3: Create Authentication Context
Create `src/contexts/AuthContext.tsx`:
```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Google sign in error:', error)
      throw error
    }
  }

  const signInWithEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Email sign in error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  const value = {
    user,
    session,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

### Step 4: Update Root Layout
Update `src/app/layout.tsx` to include the AuthProvider:
```typescript
import { AuthProvider } from '@/contexts/AuthContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### Step 5: Create Authentication Callback Handler
Create `src/app/auth/callback/route.ts`:
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )

    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}
```

### Step 5.5: Create Middleware for Session Handling
Create `src/middleware.ts`:
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && request.nextUrl.pathname !== '/') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/'
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Step 6: Create Login Component
Create `src/components/auth/LoginForm.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { signInWithGoogle, signInWithEmail } = useAuth()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      setMessage('Google sign in failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      await signInWithEmail(email)
      setMessage('Check your email for the magic link!')
      setEmail('')
    } catch (error) {
      setMessage('Email sign in failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      
      {/* Google Sign In */}
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : 'Sign in with Google'}
      </button>

      <div className="text-center mb-4">
        <span className="text-gray-500">or</span>
      </div>

      {/* Email Sign In */}
      <form onSubmit={handleEmailSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">
          {message}
        </p>
      )}
    </div>
  )
}
```

### Step 7: Create Protected Route Component
Create `src/components/auth/ProtectedRoute.tsx`:
```typescript
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
```

### Step 8: Create User Profile Component
Create `src/components/auth/UserProfile.tsx`:
```typescript
'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function UserProfile() {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      
      <div className="mb-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Provider:</strong> {user.app_metadata?.provider || 'email'}</p>
        <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
      </div>

      <button
        onClick={signOut}
        className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  )
}
```

### Step 9: Update Main Page
Update `src/app/page.tsx` to include authentication:
```typescript
'use client'

import { useAuth } from '@/contexts/AuthContext'
import LoginForm from '@/components/auth/LoginForm'
import UserProfile from '@/components/auth/UserProfile'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        IEA Expert
      </h1>
      
      {user ? <UserProfile /> : <LoginForm />}
    </div>
  )
}
```

## Supabase Dashboard Configuration

### 1. Authentication Settings
1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your site URL and redirect URLs
3. Add `http://localhost:3000/auth/callback` for local development
4. Add your production domain for production

### 2. Google OAuth Setup
1. Go to Authentication > Providers > Google
2. Enable Google provider
3. Add your Google OAuth credentials (Client ID and Secret)
4. Configure authorized redirect URIs in Google Cloud Console

### 3. Email Templates
1. Go to Authentication > Email Templates
2. Customize the "Magic Link" email template
3. Update branding and messaging as needed

## Testing

### Local Development
1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Test both Google OAuth and email link authentication
4. Check email delivery for magic links

### Production Testing
1. Deploy your application
2. Update Supabase redirect URLs
3. Test authentication flows in production environment
4. Monitor authentication logs in Supabase dashboard

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **CORS**: Configure CORS settings in Supabase for production domains
3. **Rate Limiting**: Implement rate limiting for email authentication
4. **Session Management**: Use secure session handling and proper logout
5. **Error Handling**: Implement proper error handling without exposing sensitive information

## Troubleshooting

### Common Issues
1. **Redirect Loop**: Check redirect URLs in Supabase dashboard
2. **Google OAuth Errors**: Verify OAuth credentials and redirect URIs
3. **Email Not Received**: Check spam folder and email template configuration
4. **CORS Errors**: Verify domain configuration in Supabase

### Debug Steps
1. Check browser console for JavaScript errors
2. Verify environment variables are loaded correctly
3. Check Supabase dashboard logs for authentication events
4. Test with different browsers and devices

## Next Steps

After implementing basic authentication:
1. Add user profile management
2. Implement role-based access control
3. Add password-based authentication as fallback
4. Implement email verification
5. Add social login providers (GitHub, Discord, etc.)
6. Implement user onboarding flow

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
