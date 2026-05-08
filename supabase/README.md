# AIXCO Energy Supabase Backend

This directory contains the Supabase migration for the AIXCO Energy website backend.

## Current Backend Surface

- `energy_contact_submissions`: future lead form submissions from the energy site.
- `energy_intent_events`: anonymous BlueRock, email, project, article, and PDF handoff events from the energy site.

## Security Model

- RLS is enabled and forced on every public table.
- Browser clients only use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Secret keys and database URLs stay in local env files or provider env vars, never in `NEXT_PUBLIC_*`.
- Anonymous visitors can insert lead/event rows, but cannot select, update, or delete them.

## Useful Commands

```powershell
npx supabase link --project-ref zrgcrfyxokxcjpdabaoi
npx supabase db push --linked
```
