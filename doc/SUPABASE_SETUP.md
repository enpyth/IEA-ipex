# Supabase Authentication Setup

This project has been migrated from Clerk to Supabase authentication with Google and Email providers.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account or sign in
2. Create a new project
3. Wait for the project to be set up (this may take a few minutes)

### 2. Configure Authentication

1. In your Supabase dashboard, go to **Authentication** > **Settings**
2. Configure your site URL:
   - For development: `http://localhost:3000`
   - For production: Your actual domain
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/dashboard/overview`

### 3. Enable Google OAuth

1. Go to **Authentication** > **Providers**
2. Enable Google provider
3. Get your Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`
4. Add your Google Client ID and Client Secret to Supabase

### 4. Configure Email Authentication

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Enable Email provider
3. Configure email templates if needed

### 5. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

You can find these values in your Supabase project settings under **API**.

### 6. Database Schema

This project uses a `profiles` table to store additional user information. Run the following SQL in your Supabase SQL editor:

```sql
-- Create the profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin', 'membership', 'visitor')) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  points INTEGER DEFAULT 0,
  full_name TEXT,
  birthday DATE
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, email, points, full_name, birthday)
  VALUES (
    new.id, 
    'visitor', 
    COALESCE(new.email, ''), 
    0, 
    COALESCE(new.raw_user_meta_data->>'full_name', NULL), 
    NULL
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

Alternatively, you can run the `supabase-setup.sql` file directly in your Supabase SQL editor.

### 7. Run the Application

```bash
pnpm install
pnpm dev
```

## Features

- **Email Authentication**: Users can sign up and sign in with email/password
- **Google OAuth**: Users can sign in with their Google account
- **Protected Routes**: Dashboard routes are protected and require authentication
- **User Profile**: User information is displayed in the navigation
- **Sign Out**: Users can sign out from the user menu

## Migration Notes

- Removed all Clerk dependencies and components
- Updated middleware to use Supabase authentication
- Created custom auth components for sign-in and sign-up
- Added auth context for state management
- Updated user avatar and navigation components

## Troubleshooting

1. **OAuth not working**: Make sure your redirect URLs are correctly configured in both Google Cloud Console and Supabase
2. **Email confirmation not working**: Check your Supabase email settings and templates
3. **Build errors**: Make sure all environment variables are set correctly

## Security Notes

- Never expose your `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- Use Row Level Security (RLS) policies for database tables
- Regularly rotate your API keys
- Monitor your Supabase dashboard for any suspicious activity
