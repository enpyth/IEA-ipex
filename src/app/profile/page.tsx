import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function ProfilePage() {
    const supabase = await createServerSupabaseClient()
    
    // Get both user and session data
    const [userResult, sessionResult] = await Promise.all([
        supabase.auth.getUser(),
        supabase.auth.getSession()
    ])
    
    if (userResult.error) {
        console.error('User error:', userResult.error)
        return <div>Error: {userResult.error.message}</div>
    }
    
    if (sessionResult.error) {
        console.error('Session error:', sessionResult.error)
        return <div>Error: {sessionResult.error.message}</div>
    }
    
    if (!userResult.data.user) {
        return <div>Please sign in to view your profile.</div>
    }
    
    const user = userResult.data.user
    const session = sessionResult.data.session
    
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            
            {/* User Information */}
            <div className="bg-white p-4 rounded-lg border">
                <h2 className="text-lg font-semibold mb-3">User Information</h2>
                <div className="space-y-3">
                    <div>
                        <label className="font-semibold text-sm text-gray-600">Email:</label>
                        <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-sm text-gray-600">User ID:</label>
                        <p className="font-mono text-sm text-gray-900">{user.id}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-sm text-gray-600">Created:</label>
                        <p className="text-gray-900">{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div>
                        <label className="font-semibold text-sm text-gray-600">Last Sign In:</label>
                        <p className="text-gray-900">{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}</p>
                    </div>
                </div>
            </div>

            {/* Session Information */}
            <div className="bg-white p-4 rounded-lg border">
                <h2 className="text-lg font-semibold mb-3">Session Information</h2>
                {session ? (
                    <div className="space-y-3">
                        <div>
                            <label className="font-semibold text-sm text-gray-600">Session Status:</label>
                            <p className="text-green-600 font-medium">Active</p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600">Access Token:</label>
                            <p className="font-mono text-xs text-gray-700 break-all">
                                {session.access_token.substring(0, 50)}...
                            </p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600">Access Token:</label>
                            <p className="font-mono text-xs text-gray-700 break-all">
                                {session.access_token}
                            </p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600">Token Type:</label>
                            <p className="text-gray-900">{session.token_type}</p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600">Expires At:</label>
                            <p className="text-gray-900">
                                {session.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600">Refresh Token:</label>
                            <p className="font-mono text-xs text-gray-700 break-all">
                                {session.refresh_token ? `${session.refresh_token.substring(0, 30)}...` : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600">Provider Token:</label>
                            <p className="text-gray-900">{session.provider_token || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600">Provider Refresh Token:</label>
                            <p className="text-gray-900">{session.provider_refresh_token || 'N/A'}</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className="font-semibold text-sm text-gray-600">Session Status:</label>
                        <p className="text-red-600 font-medium">No Active Session</p>
                    </div>
                )}
            </div>
        </div>
    )
}