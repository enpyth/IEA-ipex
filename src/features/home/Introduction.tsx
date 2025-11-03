'use client'

import { Container, Typography, Box, Grid } from '@mui/material'
import { useI18n } from '@/lib/contexts/LanguageContent'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const benefits = [
  'Custom software development tailored to your needs',
  'Cloud migration and infrastructure optimization',
  '24/7 technical support and maintenance',
  'Enterprise-grade security and compliance',
  'Scalable solutions that grow with your business',
  'Proven track record with 500+ successful projects'
]

export default function Introduction() {
  const t = useI18n()
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            About NovaTech Solutions
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            We are a leading technology company specializing in innovative software solutions, 
            cloud services, and digital transformation for businesses of all sizes.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            With over a decade of experience in the industry, we have helped hundreds of 
            companies modernize their operations, improve efficiency, and achieve their 
            digital transformation goals. Our team of expert developers, designers, and 
            consultants work closely with clients to deliver solutions that drive real business value.
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Why Choose Us?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {benefits.map((benefit, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ color: 'success.main', mr: 2, fontSize: 20 }} />
                  <Typography variant="body1">{benefit}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}


