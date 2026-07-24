# mivialab-web

Monorepo for the MiviaLab marketing website — design explorations, production code, and shared assets.

## Structure

```
mivialab-web/
├── design/          # Design prototypes + archive (main/ = visual reference)
├── web/             # Production site — Next.js App Router (implements design/main)
├── assets/          # Docs, images, and other shared files (not the web app's public folder)
├── .cursor/rules/   # Agent rules and project context
├── AGENTS.md        # Agent guidance (structure, business context, conventions)
└── README.md
```

## Production

```bash
cd web
npm install
npm run dev
```

See [`web/README.md`](web/README.md) for routes, env vars (Resend), and deploy notes.

## Where things go

| What | Where |
|---|---|
| Layout / visual experiments | `design/<name>/` (active reference: `design/main/`) |
| Deployable website | `web/` (Next.js) |
| Business strategy, copy docs | `assets/docs/` |
| Logos, photos, raw media | `assets/images/` |
| Agent guidance | `.cursor/rules/` |
