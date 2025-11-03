import { Resend } from 'resend'
import { ReactElement } from 'react'
import { fromAddress as defaultFromAddress } from '@/constants/config'

type SendEmailParams = {
  to: string | string[]
  subject: string
  react: ReactElement
  from?: string
}

let resendClient: Resend | null = null

function getResendClient(): Resend {
  if (resendClient) return resendClient
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set')
  }
  resendClient = new Resend(apiKey)
  return resendClient
}

export async function sendEmail({ to, subject, react, from }: SendEmailParams) {
  const client = getResendClient()
  const fromAddress = from ?? defaultFromAddress

  const { data, error } = await client.emails.send({
    from: fromAddress,
    to,
    subject,
    react,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export type EnquiryPayload = {
  name: string
  email: string
  message: string
}

export async function sendEnquiryEmail(to: string, payload: EnquiryPayload) {
  const { EnquiryEmail } = await import('./template/enquiry')
  const subject = `New enquiry from ${payload.name}`
  return sendEmail({
    to,
    subject,
    react: EnquiryEmail(payload),
  })
}


