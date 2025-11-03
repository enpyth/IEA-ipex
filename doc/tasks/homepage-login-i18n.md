# homepage-login-i18n

## Goal
Create a homepage that displays a title and authentication UI, with a button to toggle the language between English and Mandarin (Simplified Chinese).

## Scope
- In scope:
  - Add language toggle button on the homepage
  - Minimal client-side i18n state stored in `localStorage`
  - Keep existing Supabase-based login UI (LoginForm or UserProfile) on the homepage
- Out of scope:
  - Full i18n framework integration (e.g., next-intl, next-i18next)
  - Translating all components (LoginForm/UserProfile remain in English for now)

## Acceptance Criteria
- [ ] Homepage shows a title in the selected language
- [ ] A button toggles language between English and Mandarin
- [ ] The selected language persists across reloads
- [ ] Login feature is visible: shows `UserProfile` when signed in, `LoginForm` otherwise

## Design / Approach
- Implement client component logic in `src/app/page.tsx` with `useState` and `useEffect`.
- Read and write the selected language to `localStorage` under key `preferredLanguage`.
- Keep AuthContext and login components as-is; only translate the page heading and toggle button label.

## Risks & Mitigations
- Risk: `localStorage` unavailable during SSR. Mitigation: Access it inside `useEffect` and gate rendering by initial state.
- Risk: Inconsistent UI language for login components. Mitigation: Out of scope; can be addressed later with a full i18n solution.

## Rollout Plan
1. Implement `page.tsx` changes
2. Verify build and linting
3. Manual test toggling and auth flows

## Links
- `src/app/page.tsx`
- `src/contexts/AuthContext.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/UserProfile.tsx`

