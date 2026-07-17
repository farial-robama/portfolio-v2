# Jahidul Alam — Portfolio (Next.js + Tailwind CSS)

A full-stack rebuild of the original static portfolio using **Next.js 14 (App Router)**,
**TypeScript**, and **Tailwind CSS**, with a small **backend** powered by Next.js API
Routes and a JSON file "database."

## Folder structure

```
portfolio-nextjs/
├── data/                     # JSON "database" (backend storage)
│   ├── posts.json
│   └── projects.json
├── public/
│   ├── images/
│   └── Jahidul_Alam_CV.pdf   # add your real CV here
├── src/
│   ├── app/
│   │   ├── layout.tsx        # root layout (fonts, metadata)
│   │   ├── globals.css       # Tailwind layers + shared classes
│   │   ├── page.tsx          # public homepage (server component)
│   │   ├── dashboard/
│   │   │   ├── layout.tsx    # admin shell (sidebar)
│   │   │   └── page.tsx      # admin overview
│   │   └── api/              # BACKEND — route handlers
│   │       ├── posts/route.ts
│   │       ├── posts/[id]/route.ts
│   │       ├── projects/route.ts
│   │       └── contact/route.ts
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   ├── sections/         # Hero, Journey, Toolkit, Projects, SoftAura, Blog, Contact
│   │   ├── dashboard/        # Sidebar, StatsCards, PostsTable, NewPostForm
│   │   └── ui/                # RevealOnScroll, Eyebrow
│   ├── hooks/                 # useScrollSpy, useCountUp
│   └── lib/
│       ├── data.ts            # data-access layer (reads/writes JSON "DB")
│       └── types.ts           # shared TypeScript types
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

### Why this structure?

- **`app/`** uses the Next.js App Router: every folder under `app/api/*` is a real
  backend endpoint running on the server (Node.js), while everything else is
  rendered as React (server components by default, `"use client"` only where
  interactivity is needed — forms, scroll effects, the mobile menu).
- **`lib/data.ts`** is the single place that touches storage. Swap its internals
  for Prisma + PostgreSQL/MySQL/MongoDB later without touching any component.
- **`components/sections/*`** are pure, presentational, and receive data as
  props — easy to test and reuse.
- **`data/*.json`** acts as a zero-config database so the project runs
  immediately. In production, replace this with a real database (see below).

## 1. Prerequisites

- Node.js 18.17+ (Node 20 LTS recommended)
- npm (comes with Node) — yarn/pnpm also work

## 2. Install dependencies

```bash
cd portfolio-nextjs
npm install
```

## 3. Run the dev server

```bash
npm run dev
```

Visit:
- Public site → http://localhost:3000
- Admin dashboard → http://localhost:3000/dashboard

## 4. Add your assets

- Drop your CV at `public/Jahidul_Alam_CV.pdf` (the "Download CV" buttons already
  link to `/Jahidul_Alam_CV.pdf`).
- Replace the placeholder "JA" portrait block in
  `src/components/sections/Hero.tsx` with a real photo using `next/image`:

  ```tsx
  import Image from "next/image";
  // put your photo at public/images/portrait.jpg, then:
  <Image src="/images/portrait.jpg" alt="Md. Jahidul Alam" fill className="object-cover" />
  ```

## 5. Edit content

- **Timeline** → `src/components/sections/Journey.tsx` (`TIMELINE` array)
- **Toolkit/skills** → `src/components/sections/Toolkit.tsx` (`GROUPS` array)
- **Projects** → `data/projects.json` (served via `GET /api/projects`)
- **Blog posts** → `data/posts.json`, or create posts live from `/dashboard`
  (`POST /api/posts`)

## 6. How the "backend" works

| Route                  | Method | Purpose                          |
|-------------------------|--------|-----------------------------------|
| `/api/posts`            | GET    | List all posts                    |
| `/api/posts`            | POST   | Create a post (`{title, excerpt, status}`) |
| `/api/posts/:id`        | GET    | Fetch a single post                |
| `/api/posts/:id`        | DELETE | Delete a post                      |
| `/api/projects`         | GET    | List all projects                  |
| `/api/contact`          | POST   | Handle the contact form            |

The homepage and dashboard read data **directly on the server** via
`src/lib/data.ts` (fast, no network hop). The dashboard's "New Journal Entry"
form and the public contact form call the API routes over `fetch` from the
browser, exactly like they would against any external backend.

## 7. Moving to a real database (optional, recommended for production)

`data/*.json` works great for demos but resets on redeploy on most hosts.
To go further:

1. `npm install prisma @prisma/client` and `npx prisma init`
2. Define `Post` / `Project` / `Message` models in `prisma/schema.prisma`
3. Replace the function bodies in `src/lib/data.ts` with Prisma calls
   (the function **signatures** stay the same, so no component changes needed)
4. Add a real email provider (e.g. Resend) inside `src/app/api/contact/route.ts`

## 8. Build & deploy

```bash
npm run build
npm run start   # production server on http://localhost:3000
```

**Deploy to Vercel** (recommended, zero-config for Next.js):

1. Push this project to a GitHub repo
2. Go to https://vercel.com → New Project → import the repo
3. Framework preset auto-detects "Next.js" — click Deploy
4. If you added a database, add its connection string under
   Project → Settings → Environment Variables

## 9. Useful scripts

```bash
npm run dev      # start dev server with hot reload
npm run build    # production build
npm run start    # run the production build
npm run lint     # run ESLint
```
