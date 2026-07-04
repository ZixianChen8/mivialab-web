# mivialab-web

Monorepo for the MiviaLab marketing website — design explorations, production code, and shared assets.

## Structure

```
mivialab-web/
├── design/          # Static design prototypes (simple HTML/CSS; one subfolder per direction)
├── web/             # Production site — full tech stack lives here
├── assets/          # Docs, images, and other shared files (not the web app's public folder)
├── .cursor/rules/   # Agent rules and project context
├── AGENTS.md        # Agent guidance (structure, business context, conventions)
└── README.md
```

## Where things go

| What | Where |
|---|---|
| Layout / visual experiments | `design/<name>/` |
| Deployable website | `web/` |
| Business strategy, copy docs | `assets/docs/` |
| Logos, photos, raw media | `assets/images/` |
| Agent guidance | `.cursor/rules/` |
