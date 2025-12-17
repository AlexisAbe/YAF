// server/seedIfEmpty.js
import { db } from "./db.js";
import { sanitizeText } from "./sanitize.js";
import { SEED_CREATIVES, URL_META_TT, URL_YT } from "./seedData.js";

export function seedIfEmpty() {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) as c FROM creatives", [], (err, row) => {
      if (err) return reject(err);

      const count = Number(row?.c || 0);
      if (count > 0) return resolve({ seeded: false, count });

      const stmt = db.prepare(`
        INSERT INTO creatives
        (video, format, season, targeting, platforms, wording, url_meta_tiktok, url_youtube)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const c of SEED_CREATIVES) {
        stmt.run(
          sanitizeText(c.video),
          sanitizeText(c.format),
          Number(c.season),
          sanitizeText(c.targeting),
          sanitizeText(c.platforms),
          sanitizeText(c.wording),
          URL_META_TT,
          URL_YT
        );
      }

      stmt.finalize((e2) => {
        if (e2) return reject(e2);
        resolve({ seeded: true, count: SEED_CREATIVES.length });
      });
    });
  });
}
