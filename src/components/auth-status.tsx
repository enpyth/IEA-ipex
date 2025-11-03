'use client'

import { useAuth } from '@/lib/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export function AuthStatus() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>
  }

  if (!user) {
    return <div className="text-sm text-muted-foreground">Not signed in</div>
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">
        Signed in as: {user.email}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={signOut}
      >
        Sign Out
      </Button>
    </div>
  )
}
