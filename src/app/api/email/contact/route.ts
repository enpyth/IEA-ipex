import { NextRequest, NextResponse } from 'next/server'
import { toAddress, fromAddress } from '@/config/email'
import { generateContactEmailHtml, type ContactEmailData } from '@/components/email-templates/contact-email'

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.RESEND_API_KEY
        if (!apiKey) {
            console.error('Missing RESEND_API_KEY environment variable')
            // In development, return success to allow testing
            if (process.env.NODE_ENV === 'development') {
                console.log('Development mode: Simulating email send')
                return NextResponse.json({ 
                    success: true, 
                    id: 'dev-simulated',
                    message: 'Email would be sent in production (RESEND_API_KEY not set)'
                })
            }
            return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
        }

        const body = (await request.json()) as Partial<ContactEmailData>
        const { firstName, lastName, email, subject, message, source } = body

        console.log('Received contact form data:', { firstName, lastName, email, subject, hasMessage: !!message })

        if (!firstName || !lastName || !email || !subject || !message) {
            return NextResponse.json({ 
                error: 'Missing required fields',
                missing: {
                    firstName: !firstName,
                    lastName: !lastName,
                    email: !email,
                    subject: !subject,
                    message: !message
                }
            }, { status: 400 })
        }

        const emailHtml = generateContactEmailHtml({
            firstName,
            lastName,
            email,
            subject,
            message,
            source,
        })

        console.log('Sending email via Resend:', { from: fromAddress, to: toAddress, subject })

        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: fromAddress,
                to: [toAddress],
                subject: `[Website] Contact Enquiry: ${subject}`,
                html: emailHtml,
                reply_to: email,
            }),
        })

        if (!resendResponse.ok) {
            const err = await resendResponse.text()
            console.error('Resend API error:', { status: resendResponse.status, error: err })
            return NextResponse.json({ 
                error: 'Failed to send email', 
                details: err,
                status: resendResponse.status
            }, { status: 502 })
        }

        const data = await resendResponse.json()
        console.log('Email sent successfully:', { id: data?.id })
        return NextResponse.json({ success: true, id: data?.id })
    } catch (error) {
        console.error('Error sending contact email:', error)
        return NextResponse.json({ 
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}


