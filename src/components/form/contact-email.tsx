'use client'

import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import * as React from 'react'

type SubjectOption = {
    value: string
    label: string
}

export type ContactEmailProps = {
    subjectOptions: SubjectOption[]
    buttonLabel?: string
    messagePlaceholder?: string
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
    className?: string
}

export default function ContactEmail(props: ContactEmailProps) {
    const { subjectOptions, buttonLabel = 'Send Message', messagePlaceholder, onSubmit, className } = props
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')
    const [submitMessage, setSubmitMessage] = React.useState('')
    
    // Form state for controlled inputs
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    }

    const handleSelectChange = (event: any) => {
        setFormData(prev => ({
            ...prev,
            subject: event.target.value
        }))
    }

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
        })
    }

    const handleSubmit = React.useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            if (onSubmit) return onSubmit(e)
            e.preventDefault()
            setIsSubmitting(true)
            setSubmitStatus('idle')
            setSubmitMessage('')

            try {
                const payload = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                }

                const response = await fetch('/api/email/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })

                const result = await response.json()

                if (response.ok) {
                    setSubmitStatus('success')
                    setSubmitMessage('Message sent successfully!')
                    resetForm()
                } else {
                    setSubmitStatus('error')
                    const errorMessage = result.error || result.message || 'Failed to send message'
                    setSubmitMessage(errorMessage)
                    console.error('API Error:', result)
                }
            } catch (error) {
                console.error('Error sending message:', error)
                setSubmitStatus('error')
                setSubmitMessage('An unexpected error occurred. Please try again.')
            } finally {
                setIsSubmitting(false)
            }
        },
        [onSubmit, formData]
    )

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    required
                    fullWidth
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                />
                <TextField
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    required
                    fullWidth
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                />
            </Box>

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
                <InputLabel>Subject</InputLabel>
                <Select 
                    name="subject" 
                    label="Subject" 
                    required
                    value={formData.subject}
                    onChange={handleSelectChange}
                >
                    {subjectOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                name="message"
                label="Message"
                multiline
                rows={4}
                placeholder={messagePlaceholder ?? 'Tell us more about your inquiry...'}
                required
                fullWidth
                value={formData.message}
                onChange={handleInputChange('message')}
            />

            {/* Submit Status Messages */}
            {submitStatus === 'success' && (
                <Typography color="success.main" variant="body2">
                    {submitMessage}
                </Typography>
            )}

            {submitStatus === 'error' && (
                <Typography color="error.main" variant="body2">
                    {submitMessage}
                </Typography>
            )}

            <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                startIcon={<SendIcon />}
                sx={{ width: '100%' }}
            >
                {isSubmitting ? 'Sending...' : buttonLabel}
            </Button>
        </Box>
    )
}


