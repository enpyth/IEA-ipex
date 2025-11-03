'use client'

import { Container, Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    avatar: 'SJ',
    content: 'NovaTech Solutions transformed our business operations with their innovative software solutions. Their team\'s expertise and dedication exceeded our expectations.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'CTO, GlobalCorp',
    avatar: 'MC',
    content: 'The cloud migration service was seamless and our performance improved by 40%. Highly recommend NovaTech for any enterprise technology needs.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Director, InnovateLab',
    avatar: 'ER',
    content: 'Outstanding support and development services. NovaTech helped us scale our platform to handle 10x more users without any issues.',
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
          What Our Clients Say
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Don't just take our word for it - hear from our satisfied customers
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: 'warning.main', fontSize: 20 }} />
                  ))}
                </Box>
                
                <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                  "{testimonial.content}"
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

