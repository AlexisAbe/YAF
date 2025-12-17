// server/db.js
import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

const DB_PATH = process.env.DB_PATH || "./data/yafrica.sqlite";

// create folder if needed (important on Render with /app/data)
const dir = path.dirname(DB_PATH);
if (dir && dir !== "." && !fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

export const db = new sqlite3.Database(DB_PATH);

export function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS creatives (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        video TEXT NOT NULL,
        format TEXT NOT NULL,
        season INTEGER NOT NULL,
        targeting TEXT NOT NULL,
        platforms TEXT NOT NULL,
        wording TEXT NOT NULL,
        url_meta_tiktok TEXT NOT NULL,
        url_youtube TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    db.run(`CREATE INDEX IF NOT EXISTS idx_creatives_season ON creatives(season)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_creatives_targeting ON creatives(targeting)`);
  });
}
