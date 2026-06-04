# PROMPTPROJECT.MD — Portfolio SMK

## PROJECT STATUS
Tanggal Update   : 2024-06-02
Fitur selesai    :
  - Next.js 15 project setup dengan App Router
  - Tailwind CSS + Shadcn/UI + Framer Motion styling
  - Supabase integration (client + server)
  - Landing page dengan hero + project grid
  - Project detail page
  - Admin login page dengan authentication
  - Admin dashboard dengan CRUD operations
  - Middleware untuk route protection

Sedang dikerjakan:
  - Dokumentasi

Bug diketahui:
  - None (belum di-test)

Keputusan teknis:
  - Tech stack: Next.js 15, Tailwind, Shadcn/UI, Framer Motion, Supabase
  - Auth: Supabase Auth (email/password)
  - Deployment target: Vercel
  - Database: PostgreSQL via Supabase

Next step:
  - Setup Supabase project dan database
  - Konfigurasi environment variables
  - Testing deployment

---

## SCOPE CONTRACT (FINAL)
Judul Projek    : Portfolio SMK — Web Portofolio dengan CMS Admin

Core Features   :
  - Landing page (hero section dengan nama, tagline)
  - Portfolio showcase (grid project cards)
  - Project detail page (gambar, judul, deskripsi, tech stack, link)
  - Admin panel (login, CRUD project: Create, Read, Update, Delete)
  - Filter/cari project (berdasarkan kategori) — nice to have
  - Responsive design (mobile-first)

Out of Scope    :
  - Blog/artikel
  - Downloadable CV
  - Multiple language
  - Comment system
  - Guestbook/testimonial section

Nice to Have    :
  - Dark/light mode
  - Animasi scroll
  - SEO optimization
  - Contact form

Stack           :
  - Frontend: Next.js 15 (React, App Router)
  - Styling: Tailwind CSS, Shadcn/UI, Framer Motion
  - Backend: Next.js API Routes / Server Actions
  - Database: PostgreSQL via Supabase (free tier)
  - Auth: Supabase Auth
  - Deployment: Vercel (free)

Kompleksitas    : 🟡 MODERATE
Estimasi        : 2-3 minggu (core features)

---

## FILE STRUCTURE

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page (home)
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx        # Admin login page
│   │   └── dashboard/
│   │       └── page.tsx        # Admin CRUD dashboard
│   └── project/
│       └── [id]/
│           └── page.tsx        # Project detail page
├── components/
│   ├── LandingPage.tsx          # Landing page component
│   ├── ProjectDetail.tsx        # Project detail component
│   └── ui/                      # Shadcn UI components
├── lib/
│   ├── utils.ts                 # Utility functions
│   └── supabase/
│       ├── client.ts            # Browser Supabase client
│       └── server.ts            # Server Supabase client
├── middleware.ts                # Route protection
├── supabase-schema.sql          # Database schema
├── .env.local                   # Environment variables
└── package.json
```

---

## SETUP INSTRUCTIONS

### 1. Setup Supabase
1. Buka https://supabase.com dan buat project baru
2. Buka SQL Editor di Supabase Dashboard
3. Copy isi dari `supabase-schema.sql` dan jalankan
4. Buka Authentication > Users > Add User untuk buat admin account

### 2. Setup Environment Variables
Edit file `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
- URL ada di: Supabase Dashboard > Settings > API
- Anon Key ada di: Supabase Dashboard > Settings > API > Project API keys

### 3. Run Locally
```bash
npm run dev
```

### 4. Deploy ke Vercel
1. Push code ke GitHub
2. Buka https://vercel.com
3. Import repository
4. Tambahkan environment variables di Vercel dashboard
5. Deploy

---

## USAGE

### Untuk Visitor (Portfolio Page)
- Buka `/` untuk lihat portfolio
- Klik project card untuk lihat detail
- Tidak perlu login

### Untuk Admin (Update Portfolio)
1. Buka `/admin/login`
2. Login dengan email & password yang sudah dibuat di Supabase
3. Di dashboard:
   - Klik "Tambah Project" untuk menambah project baru
   - Klik icon edit untuk edit project
   - Klik icon trash untuk hapus project
4. Project akan muncul di homepage secara otomatis

---

## CUSTOMIZATION

### Ganti Nama & Info
Edit `app/page.tsx` component:
- Hero section: nama, tagline
- Footer: copyright text

### Ganti Tema/Warna
Edit file `app/globals.css` atau Tailwind config untuk ubah warna primary/secondary

### Tambah Fitur
- Edit komponen yang sudah ada di `/components`
- Tambah page baru di `/app`
- Update middleware.ts untuk proteksi route baru