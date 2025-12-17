// server/index.js
import express from "express";
import cors from "cors";

import { db, initDb } from "./db.js";
import { sanitizeText } from "./sanitize.js";
import { seedIfEmpty } from "./seedIfEmpty.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

initDb();

// SEED AUTO : si la table est vide, on injecte tout ton contenu
seedIfEmpty()
  .then((r) => console.log("[seed]", r))
  .catch((e) => {
    console.error("[seed] failed:", e);
    process.exit(1);
  });

app.get("/health", (_, res) => res.json({ ok: true }));

app.get("/creatives", (req, res) => {
  const { season, platform, targeting, q } = req.query;

  let sql = "SELECT * FROM creatives WHERE 1=1";
  const params = [];

  if (season) {
    sql += " AND season = ?";
    params.push(Number(season));
  }

  if (targeting) {
    sql += " AND LOWER(targeting) = LOWER(?)";
    params.push(String(targeting));
  }

  if (platform) {
    sql += " AND platforms LIKE ?";
    params.push(`%${String(platform).toUpperCase()}%`);
  }

  if (q) {
    sql += " AND (video LIKE ? OR wording LIKE ?)";
    params.push(`%${q}%`, `%${q}%`);
  }

  sql += " ORDER BY season ASC, video ASC";

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/creatives", (req, res) => {
  const c = req.body || {};

  const video = sanitizeText(c.video);
  const format = sanitizeText(c.format);
  const season = Number(c.season);
  const targeting = sanitizeText(c.targeting);
  const platforms = sanitizeText(c.platforms);
  const wording = sanitizeText(c.wording);

  if (!video || !format || !season || !targeting || !platforms || !wording) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // URLs globales (ton besoin)
  const url_meta_tiktok = "https://linktr.ee/yafrica";
  const url_youtube =
    "https://www.youtube.com/playlist?list=PLSCwkooe6sD5jZothn-JbsfdWNl_2UCUk";

  db.run(
    `INSERT INTO creatives
      (video, format, season, targeting, platforms, wording, url_meta_tiktok, url_youtube)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [video, format, season, targeting, platforms, wording, url_meta_tiktok, url_youtube],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get("SELECT * FROM creatives WHERE id = ?", [this.lastID], (e2, row) => {
        if (e2) return res.status(500).json({ error: e2.message });
        res.json(row);
      });
    }
  );
});

app.put("/creatives/:id", (req, res) => {
  const id = Number(req.params.id);
  const c = req.body || {};

  const video = sanitizeText(c.video);
  const format = sanitizeText(c.format);
  const season = Number(c.season);
  const targeting = sanitizeText(c.targeting);
  const platforms = sanitizeText(c.platforms);
  const wording = sanitizeText(c.wording);

  db.run(
    `UPDATE creatives
     SET video=?, format=?, season=?, targeting=?, platforms=?, wording=?, updated_at=datetime('now')
     WHERE id=?`,
    [video, format, season, targeting, platforms, wording, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get("SELECT * FROM creatives WHERE id = ?", [id], (e2, row) => {
        if (e2) return res.status(500).json({ error: e2.message });
        res.json(row);
      });
    }
  );
});

app.delete("/creatives/:id", (req, res) => {
  const id = Number(req.params.id);
  db.run("DELETE FROM creatives WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
