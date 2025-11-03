'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { muiTheme } from '@/lib/mui-theme'
import Providers from '@/components/layout/providers'
import { Toaster } from '@/components/ui/sonner'

export default function AppClient({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div suppressHydrationWarning />
    }

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Providers>
                <Toaster />
                {children}
            </Providers>
        </MuiThemeProvider>
    )
}


