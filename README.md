# YAfrica Trader App

A simple web app for media traders to:
- browse creatives + wordings
- filter/search
- copy sanitized wording and correct URL per platform
- edit rows (CRUD)
- export CSV

## Local run
```bash
npm install
npm run seed
npm run dev
```

## Deploy without running on your Mac (recommended): Render (Docker)
1) Push this repo to GitHub.
2) On Render: **New +** → **Web Service** → connect GitHub repo.
3) Choose **Docker**.
4) Set:
   - **Region**: EU (if possible)
   - **Plan**: Free/Starter
5) Deploy. Render will build and host your app with a shareable URL.

### Data persistence
SQLite file is stored in `/app/data/yafrica.sqlite`.
On Render free tier, disk persistence may be ephemeral unless you attach a persistent disk.
If you need persistent edits, attach a disk or migrate to Postgres later.

## Environment variables (optional)
- `DB_PATH` (default `./data/yafrica.sqlite`)
- `PORT` (provided by host)
