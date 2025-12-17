import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { db, initDb } from "./db.js";
import { sanitizeText } from "./sanitize.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

initDb();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const URL_META_TT = "https://linktr.ee/yafrica";
const URL_YT = "https://www.youtube.com/playlist?list=PLSCwkooe6sD5jZothn-JbsfdWNl_2UCUk";

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.get("/api/creatives", (req, res) => {
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

app.post("/api/creatives", (req, res) => {
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

  db.run(
    `INSERT INTO creatives (video, format, season, targeting, platforms, wording, url_meta_tiktok, url_youtube)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [video, format, season, targeting, platforms, wording, URL_META_TT, URL_YT],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get("SELECT * FROM creatives WHERE id = ?", [this.lastID], (e2, row) => {
        if (e2) return res.status(500).json({ error: e2.message });
        res.json(row);
      });
    }
  );
});

app.put("/api/creatives/:id", (req, res) => {
  const id = Number(req.params.id);
  const c = req.body || {};

  const video = sanitizeText(c.video);
  const format = sanitizeText(c.format);
  const season = Number(c.season);
  const targeting = sanitizeText(c.targeting);
  const platforms = sanitizeText(c.platforms);
  const wording = sanitizeText(c.wording);

  if (!id) return res.status(400).json({ error: "Invalid id" });

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

app.delete("/api/creatives/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });

  db.run("DELETE FROM creatives WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

app.get("/api/export.csv", (req, res) => {
  db.all("SELECT * FROM creatives ORDER BY season ASC, video ASC", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);

    const headers = [
      "Video","Format","Saison","Ciblage","Plateforme","Wording","URL_META_TIKTOK","URL_YOUTUBE"
    ];
    const lines = [headers.join(",")];

    for (const r of rows) {
      const csvSafe = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      lines.push([
        csvSafe(r.video),
        csvSafe(r.format),
        csvSafe(r.season),
        csvSafe(r.targeting),
        csvSafe(r.platforms),
        csvSafe(r.wording),
        csvSafe(r.url_meta_tiktok),
        csvSafe(r.url_youtube)
      ].join(","));
    }

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.send(lines.join("\\n"));
  });
});

// Serve frontend build if present
const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`YAfrica Trader App running on :${PORT}`);
});
