'use client'

import { Box, Container, Typography } from '@mui/material'
import { useI18n } from '@/lib/contexts/LanguageContent'

export default function Banner() {
  const t = useI18n()
  return (
    <Box sx={{ py: 8, bgcolor: 'grey.100' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom>
          {t.banner.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {t.banner.subtitle}
        </Typography>
      </Container>
    </Box>
  )
}


