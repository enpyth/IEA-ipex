import React from 'react'

export type EnquiryEmailProps = {
  name: string
  email: string
  message: string
}

export function EnquiryEmail({ name, email, message }: EnquiryEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#111', lineHeight: 1.6 }}>
      <h2 style={{ margin: '0 0 12px' }}>New Website Enquiry</h2>
      <p style={{ margin: '0 0 16px' }}>
        You have received a new enquiry from the contact form.
      </p>
      <table cellPadding={0} cellSpacing={0} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 600, padding: '8px 0', width: 120 }}>Name</td>
            <td style={{ padding: '8px 0' }}>{name}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600, padding: '8px 0' }}>Email</td>
            <td style={{ padding: '8px 0' }}>{email}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600, padding: '8px 0', verticalAlign: 'top' }}>Message</td>
            <td style={{ padding: '8px 0', whiteSpace: 'pre-wrap' }}>{message}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default EnquiryEmail
