import sqlite3 from "sqlite3";

const DB_PATH = process.env.DB_PATH || "./data/yafrica.sqlite";

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
