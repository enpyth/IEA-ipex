'use client'

import Link from 'next/link'
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar, Menu, MenuItem, Container } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import LoginIcon from '@mui/icons-material/Login'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { useI18n } from '@/lib/contexts/LanguageContent'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { language, toggleLanguage } = useLanguage()
  const t = useI18n()
  const { user, signOut, loading } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const open = Boolean(anchorEl)
  const router = useRouter()

  // 防止水合错误
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ px: 0, minHeight: 64 }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary', fontWeight: 700, letterSpacing: '.2px' }}
          >
            {t.header.siteTitle}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button component={Link} href="/" color="inherit">
              {t.header.home}
            </Button>
            <Button component={Link} href="/about" color="inherit">
              {t.header.about}
            </Button>
            <Button component={Link} href="/products" color="inherit">
              {t.header.products}
            </Button>
            <Button component={Link} href="/events" color="inherit">
              {t.header.events}
            </Button>
            <Button component={Link} href="/experts" color="inherit">
              {t.header.experts}
            </Button>
            <Button component={Link} href="/membership" color="inherit">
              {t.header.membership}
            </Button>
            <Button component={Link} href="/contact" color="inherit">
              {t.header.contact}
            </Button>
            <Button onClick={toggleLanguage} startIcon={<LanguageIcon />} color="inherit">
              {t.header.language}
            </Button>
            {mounted && user ? (
              <>
                <IconButton onClick={handleAvatarClick} size="small" sx={{ ml: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem disabled>{user.email}</MenuItem>
                  <MenuItem onClick={() => { handleClose(); router.push('/dashboard') }}>
                    {t.profileMenu.dashboard}
                  </MenuItem>
                  <MenuItem onClick={() => { handleClose(); router.push('/profile') }}>
                    {t.profileMenu.profile}
                  </MenuItem>
                  <MenuItem onClick={() => { handleClose(); signOut() }}>
                    {t.profileMenu.signOut}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                href="/auth/sign-in"
                startIcon={<LoginIcon />}
                variant="outlined"
              >
                {t.header.login}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}


