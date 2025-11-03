'use client'

import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'
import CloudIcon from '@mui/icons-material/Cloud'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import SupportIcon from '@mui/icons-material/Support'
import AnalyticsIcon from '@mui/icons-material/Analytics'

const features = [
  {
    icon: <CodeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Custom Development',
    description: 'Tailored software solutions built specifically for your business needs and requirements.'
  },
  {
    icon: <CloudIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services to modernize your operations.'
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Security First',
    description: 'Enterprise-grade security measures to protect your data and ensure compliance.'
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Performance Optimization',
    description: 'Boost your application performance with our optimization and monitoring services.'
  },
  {
    icon: <SupportIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: '24/7 Support',
    description: 'Round-the-clock technical support to keep your systems running smoothly.'
  },
  {
    icon: <AnalyticsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights with our analytics solutions.'
  }
]

export default function Features() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Why Choose NovaTech Solutions?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          We deliver cutting-edge technology solutions that drive business growth and innovation.
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {features.map((feature, index) => (
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
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
        ))}
      </Grid>
    </Container>
  )
}

