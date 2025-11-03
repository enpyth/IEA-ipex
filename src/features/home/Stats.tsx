'use client'

import { Container, Grid, Box, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PeopleIcon from '@mui/icons-material/People'
import StarIcon from '@mui/icons-material/Star'
import BusinessIcon from '@mui/icons-material/Business'

const stats = [
  {
    icon: <BusinessIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    number: '500+',
    label: 'Projects Completed',
    description: 'Successfully delivered projects across various industries'
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    number: '200+',
    label: 'Happy Clients',
    description: 'Long-term partnerships with satisfied customers'
  },
  {
    icon: <StarIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    number: '99%',
    label: 'Client Satisfaction',
    description: 'Consistently high ratings and positive feedback'
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    number: '50%',
    label: 'Cost Reduction',
    description: 'Average cost savings for our clients'
  }
]

export default function Stats() {
  return (
    <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Our Impact in Numbers
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Measurable results that speak for themselves
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  {stat.icon}
                </Box>
                <Typography 
                  variant="h3" 
                  component="div" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main',
                    mb: 1
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {stat.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

