# Lumen Social

**Where people and businesses connect.**

Lumen is a social app project planned with Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Status

The repository is being set up. Application code, authentication, persistent data, and deployment are not configured yet.

## Planned stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Auth, PostgreSQL, and Storage
- Vercel deployment

## Initial setup

Node.js 20.9+ and npm are recommended.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add your Supabase project URL and public anon/publishable key to `.env.local`. Never commit real secrets or expose a service-role key in browser code.

## Roadmap

1. App shell and responsive feed
2. Authentication and profiles
3. Posts, media uploads, likes, comments, and follows
4. Messaging, notifications, search, and business profiles
5. Reporting, moderation, admin tools, and production hardening
