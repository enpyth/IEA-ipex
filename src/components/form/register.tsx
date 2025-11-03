'use client'

import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography, Alert } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import * as React from 'react'

type MembershipType = 'visitor' | 'institutional' | 'corporate' | 'student'

interface MembershipFormData {
  fullName: string
  email: string
  membershipType: MembershipType
  country: string
  affiliation: string
  field: string
  notes: string
}

export default function Register() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = React.useState('')
  
  // Form state for controlled inputs
  const [formData, setFormData] = React.useState<MembershipFormData>({
    fullName: '',
    email: '',
    membershipType: 'visitor',
    country: '',
    affiliation: '',
    field: '',
    notes: ''
  })

  const handleInputChange = (field: keyof MembershipFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSelectChange = (event: any) => {
    setFormData(prev => ({
      ...prev,
      membershipType: event.target.value as MembershipType
    }))
  }

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      membershipType: 'visitor',
      country: '',
      affiliation: '',
      field: '',
      notes: ''
    })
  }

  const validateForm = (): string | null => {
    if (!formData.fullName.trim()) return 'Full name is required'
    if (!formData.email.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address'
    if (!formData.country.trim()) return 'Country is required'
    if (!formData.affiliation.trim()) return 'Affiliation is required'
    if (!formData.field.trim()) return 'Field of study/work is required'
    return null
  }

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      
      const validationError = validateForm()
      if (validationError) {
        setSubmitStatus('error')
        setSubmitMessage(validationError)
        return
      }

      setIsSubmitting(true)
      setSubmitStatus('idle')
      setSubmitMessage('')

      try {
        const payload = {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          membershipType: formData.membershipType,
          details: {
            country: formData.country.trim(),
            affiliation: formData.affiliation.trim(),
            field: formData.field.trim(),
            notes: formData.notes.trim()
          }
        }

        const response = await fetch('/api/membership', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        const result = await response.json()

        if (response.ok) {
          setSubmitStatus('success')
          setSubmitMessage('Membership registration submitted successfully! We will review your application and contact you soon.')
          resetForm()
        } else {
          setSubmitStatus('error')
          const errorMessage = result.error || result.message || 'Failed to submit membership registration'
          setSubmitMessage(errorMessage)
          console.error('API Error:', result)
        }
      } catch (error) {
        console.error('Error submitting membership registration:', error)
        setSubmitStatus('error')
        setSubmitMessage('An unexpected error occurred. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData]
  )

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Membership Registration
      </Typography>
      
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Join our community and become a member. Please fill out the form below with your information.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          required
          fullWidth
          value={formData.fullName}
          onChange={handleInputChange('fullName')}
        />

        <TextField
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          required
          fullWidth
          value={formData.email}
          onChange={handleInputChange('email')}
        />

        <FormControl fullWidth>
          <InputLabel>Membership Type</InputLabel>
          <Select 
            name="membershipType" 
            label="Membership Type" 
            required
            value={formData.membershipType}
            onChange={handleSelectChange}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="institutional">Institutional</MenuItem>
            <MenuItem value="corporate">Corporate</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField
            name="country"
            label="Country"
            placeholder="Enter your country"
            required
            fullWidth
            value={formData.country}
            onChange={handleInputChange('country')}
          />
          <TextField
            name="affiliation"
            label="Affiliation/Organization"
            placeholder="Enter your organization or institution"
            required
            fullWidth
            value={formData.affiliation}
            onChange={handleInputChange('affiliation')}
          />
        </Box>

        <TextField
          name="field"
          label="Field of Study/Work"
          placeholder="Enter your field of study or work"
          required
          fullWidth
          value={formData.field}
          onChange={handleInputChange('field')}
        />

        <TextField
          name="notes"
          label="Additional Notes"
          multiline
          rows={3}
          placeholder="Any additional information you'd like to share..."
          fullWidth
          value={formData.notes}
          onChange={handleInputChange('notes')}
        />

        {/* Submit Status Messages */}
        {submitStatus === 'success' && (
          <Alert severity="success">
            {submitMessage}
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert severity="error">
            {submitMessage}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          startIcon={<PersonAddIcon />}
          sx={{ width: '100%', mt: 2 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Membership Application'}
        </Button>
      </Box>
    </Box>
  )
}