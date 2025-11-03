import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="text-muted-foreground">
          There was an error processing your authentication request.
        </p>
        <Button asChild>
          <Link href="/auth/sign-in">Try Again</Link>
        </Button>
      </div>
    </div>
  )
}
