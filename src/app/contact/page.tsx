"use client";
import Hero from '@/features/home/hero'
import ContactEmail from '@/components/form/contact-email'
import { Container } from '@mui/material'

export default function ContactPage() {
  const subjectOptions = [
    { value: 'enquiry', label: 'Enquiry' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' },
  ]
  return (
    <main className="flex-grow">
    <Hero imageSrc="/banner/banner-about.jpeg" title="Contact Us" />
    <Container maxWidth="md" sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
      <div className="w-full max-w-2xl">
        <ContactEmail subjectOptions={subjectOptions} />
      </div>
    </Container>
    </main>
  )
}