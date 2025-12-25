import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import { fontVariables } from '@/lib/font';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import './theme.css';
import LayoutShell from '@/components/layout/layoutshell';
import AppClient from '@/components/layout/AppClient';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export const metadata: Metadata = {
  title: {
    default: 'OZHG Platform - Australia\'s Next-Gen AI-Driven Health Expert Intelligence Engine',
    template: '%s | OZHG'
  },
  description: 'OZHG Platform breaks down fragmented health expert data across 43+ Australian universities and institutions, connecting industry, government, and researchers with the right niche experts for specific health challenges through AI-driven intelligence.',
  keywords: [
    'OZHG',
    'OZ HEALTH GLOBE',
    'Australia health experts',
    'AI health intelligence',
    'health research collaboration',
    'health expert database',
    'health innovation',
    'AI-driven health platform',
    'Australian health research'
  ],
  authors: [
    {
      name: 'OZHG Team',
      url: 'https://www.ozhg.com.au'
    }
  ],
  creator: 'OZHG Team',
  publisher: 'OZHG Platform',
  metadataBase: new URL('https://www.ozhg.com.au'),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.ozhg.com.au',
    title: 'OZHG Platform - Australia\'s Next-Gen AI-Driven Health Expert Intelligence Engine',
    description: 'OZHG Platform breaks down fragmented health expert data across 43+ Australian universities and institutions, connecting industry, government, and researchers with the right niche experts for specific health challenges through AI-driven intelligence.',
    siteName: 'OZHG Platform'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OZHG Platform - Australia\'s Next-Gen AI-Driven Health Expert Intelligence Engine',
    description: 'OZHG Platform breaks down fragmented health expert data across 43+ Australian universities and institutions, connecting industry, government, and researchers with the right niche experts for specific health challenges through AI-driven intelligence.'
  },
  alternates: {
    canonical: 'https://www.ozhg.com.au'
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const isScaled = activeThemeValue?.endsWith('-scaled');

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background font-sans antialiased overflow-x-hidden',
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : '',
          fontVariables
        )}
      >
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            {/* <AppClient> */}
            <Providers>
              <LayoutShell>{children}</LayoutShell>
            {/* // </AppClient> */}
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
