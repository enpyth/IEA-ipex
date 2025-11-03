# Task: contact-enquiry-email

## Goal
Enable users to submit an enquiry via the Contact page that sends an email to the manager using Resend.

## Scope
- In scope:
  - Build a MUI-based contact form at `src/app/contact/page.tsx`
  - Implement API route at `src/app/api/resend/route.ts` to send enquiry emails
  - Create email template at `src/lib/template/enquiry.tsx`
  - Implement Resend integration helper in `src/lib/resend.ts`
  - Add manager email config in `src/constants/config.ts`
- Out of scope:
  - Persisting enquiries to a database
  - Rate limiting / CAPTCHA
  - Advanced validation beyond basic checks

## Acceptance Criteria
- [ ] Contact page displays a form with Name, Email, Message, and Submit.
- [ ] Submitting the form calls the API and sends an email via Resend to the manager address from `src/constants/config.ts`.
- [ ] API returns success and error states; UI shows user feedback.
- [ ] Email uses the React template at `src/lib/template/enquiry.tsx`.
- [ ] Uses MUI components per frontend-style rule.

## Design / Approach
Client-side form (MUI) posts JSON to `/api/resend` (POST). Server route validates input, calls `sendEnquiryEmail` in `src/lib/resend.ts` which uses the Resend SDK and the React template component. Manager email configured in `src/constants/config.ts` to keep a single source of truth.

## Risks & Mitigations
- Risk: Missing `RESEND_API_KEY` env variable.
  - Mitigation: Validate and return a 500 with clear message server-side.
- Risk: Spam submissions.
  - Mitigation: Not in scope; can add CAPTCHA/rate-limiting later.

## Rollout Plan
- Implement feature, verify with test submission locally, confirm email delivery.
- Document required env `RESEND_API_KEY` and optional `NEXT_PUBLIC_MANAGER_EMAIL` if used.

## Links
- Template: `doc/tasks/task-template.md`
- Entrypoints:
  - `src/app/contact/page.tsx`
  - `src/app/api/resend/route.ts`
  - `src/lib/template/enquiry.tsx`
  - `src/lib/resend.ts`
  - `src/constants/config.ts`

