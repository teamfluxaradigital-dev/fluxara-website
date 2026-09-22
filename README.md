# Fluxara — Website + Team Dashboard

Two connected apps sharing one database:
- `frontend/` — public marketing site (`/`) + team login (`/team`) + dashboard (`/dashboard`)
- `backend/` — the API + database logic both talk to

---

## 1. How to keep this organized on your computer

Keep the whole `fluxara-app` folder as-is — don't rename or move things inside it. This is the structure and what each part is for:

```
fluxara-app/
├── backend/              <- the server (leads, auth, tasks, calendar API)
│   ├── models/           <- what data looks like (User, Lead, Task, Event)
│   ├── routes/           <- the actual API endpoints
│   ├── middleware/        <- login-check logic
│   ├── .env               <- YOUR SECRETS (you create this, never share it)
│   └── .env.example       <- template showing what .env needs
│
├── frontend/              <- everything the browser shows
│   ├── public/             <- images/videos go here (see below)
│   ├── src/
│   │   ├── pages/          <- Home, Login, Dashboard (top-level screens)
│   │   ├── components/     <- smaller reusable pieces
│   │   ├── App.jsx         <- routing (which URL shows which page)
│   │   └── index.css       <- all the styling
│   ├── .env                <- YOUR SECRETS (you create this)
│   └── .env.example
│
└── README.md               <- this file
```

**Rule of thumb:** `.env.example` files are safe templates (already in the folder). You create your own `.env` files (copy the example, fill in real values) — `.env` files should NEVER be uploaded to GitHub, since they hold passwords/keys.

---

### Where things live now

- **Hero video(s)** — `frontend/src/assets/hero/` (landscape clips, any filename, `.mp4`/`.webm`). They cycle in order.
- **Work wall clips/images** — `frontend/src/assets/portfolio/` (any filename, images or clips). These play side-by-side in the full-width "reel wall" under Work.
- **Client logos** — `frontend/src/assets/brands/` (any filename) — scroll automatically in the looping brand strip.

## 2. Adding your real content

**Logo** — already in place (`frontend/src/assets/logo.png`). The black box behind it
has been removed so it sits cleanly on the dark background.

**Portfolio images/clips** — drop them into `frontend/src/assets/portfolio/`.
Any filename, any of `.jpg .jpeg .png .webp .avif .gif .mp4 .webm`. They appear on
the site automatically, sorted by filename — no renaming to `1.jpg` needed.
The filename becomes the caption shown on hover, so `bulletbeats-launch.jpg`
shows as "Bulletbeats launch". Tiles are 9:16, so vertical shots look best.

**Client logos** — same deal: drop into `frontend/src/assets/brands/`.
Filename becomes the brand name. For names the filename can't produce nicely
(like "BulletBeats Café"), add it to the `PRETTY` list at the top of
`frontend/src/components/Brands.jsx`.

**Hero videos** — put `clip1.mp4`, `clip2.mp4`, `clip3.mp4` in `frontend/public/videos/`.
Until you do, the hero shows an animated gradient instead of a black rectangle.

**Contact details** — `frontend/src/components/Footer.jsx`.

---

## 3. Running it on your own computer

You need [Node.js](https://nodejs.org) installed (LTS version).

### Backend — terminal 1
```
cd backend
npm install
npm start
```
Runs at `http://localhost:5000`.

**Before this works you must fix one thing.** Open `backend/.env` and replace
`PUT_YOUR_REAL_DB_PASSWORD_HERE` in `MONGO_URI` with your actual MongoDB Atlas
password. Until you do, the server now stops with a clear message instead of
starting up broken — which is what was making the contact form's Send button
appear to do nothing.

Then, once only, create your admin account:
```
npm run seed
```

### Frontend — terminal 2
```
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`.

### Getting into the admin dashboard on localhost

1. Both terminals above must be running at the same time.
2. Go to **`http://localhost:5173/team`** — that's the login page.
   There's also a "Team login" link at the bottom right of the site footer.
3. Log in with `admin@fluxara` / `jiya123`.
4. You land on `http://localhost:5173/dashboard` — Leads, Tasks, Calendar, and
   Team (Team only shows for the admin account).

If the login says "Backend not reachable", terminal 1 isn't running or stopped
on the `.env` error. If it says the password is wrong, you haven't run
`npm run seed` yet.

**Note on the admin email:** `admin@fluxara` isn't a valid email format, but it
works as a login ID since it's only checked against the database. If you'd
rather have a normal one, change `ADMIN_EMAIL` in `backend/.env` to
`admin@fluxara.com` before running the seed step.

---

## 4. Setting up the real (free) database — MongoDB Atlas

1. Go to mongodb.com/cloud/atlas → sign up free
2. Create a free "M0" cluster
3. Under "Database Access," create a user with a password (this is different from your login — it's the database's own password)
4. Under "Network Access," add `0.0.0.0/0` (allow access from anywhere) — simplest for now
5. Click "Connect" → "Drivers" → copy the connection string, it looks like:
   `mongodb+srv://username:password@cluster.mongodb.net/fluxara`
6. Paste that into `backend/.env` as `MONGO_URI`, replacing `<password>` with your real database password

---

## 5. Putting the code on GitHub

```
cd fluxara-app
git init
git add .
git commit -m "Initial Fluxara build"
```
Create a new repository on github.com (empty, no README), then:
```
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

Your `.env` files will NOT be uploaded (they're excluded by default in `.gitignore` you should add — see below) — only `.env.example` goes up, which is correct.

Create a file named `.gitignore` in the `fluxara-app` root with this content before your first commit:
```
node_modules
.env
```

---

## 6. Deploying — free hosting

### Backend → Render.com
1. Sign up with GitHub
2. New → Web Service → connect your repo → set root directory to `backend`
3. Build command: `npm install` | Start command: `npm start`
4. Add environment variables (same as your local `.env`: `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`)
5. Deploy → you'll get a URL like `https://fluxara-backend.onrender.com`
6. After first deploy, go to Render's "Shell" tab and run `npm run seed` once to create your admin account on the live database

### Frontend → Vercel.com
1. Sign up with GitHub
2. New Project → import your repo → set root directory to `frontend`
3. Add environment variable: `VITE_API_URL` = your Render backend URL from above
4. Deploy → you'll get a live link, then connect your custom domain from Vercel's settings once you've bought it

---

## 7. Quick reference — what each cost is for

| Thing | Cost | One-time or ongoing |
|---|---|---|
| MongoDB Atlas (M0) | Free | — |
| Render (backend) | Free tier (slower cold-starts) or $7/mo for always-on | Ongoing |
| Vercel (frontend) | Free | — |
| Domain name | ~₹700–1,500 | Yearly |
