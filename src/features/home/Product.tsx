'use client'

import { Container, Grid, Card, CardContent, Typography, Box, Button } from '@mui/material'
import { useI18n } from '@/lib/contexts/LanguageContent'
import Link from 'next/link'
import WebIcon from '@mui/icons-material/Web'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import CloudIcon from '@mui/icons-material/Cloud'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const services = [
  {
    icon: <WebIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with the latest technologies.',
    features: ['React & Next.js', 'Custom CMS', 'E-commerce Solutions', 'API Development']
  },
  {
    icon: <PhoneAndroidIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Optimization']
  },
  {
    icon: <CloudIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure and migration services for modern businesses.',
    features: ['AWS & Azure', 'DevOps & CI/CD', 'Microservices', 'Cloud Security']
  }
]

export default function Product() {
  const t = useI18n()
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Our Services
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Comprehensive technology solutions designed to accelerate your business growth
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  {service.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
                  {service.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                  {service.description}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  {service.features.map((feature, featureIndex) => (
                    <Typography key={featureIndex} variant="body2" sx={{ mb: 1 }}>
                      • {feature}
                    </Typography>
                  ))}
                </Box>
                
                <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                  <Button
                    component={Link}
                    href="/products"
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ width: '100%' }}
                  >
                    Learn More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}


