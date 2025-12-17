import fs from "fs";
import path from "path";
import { db, initDb } from "./db.js";
import { sanitizeText } from "./sanitize.js";

initDb();

const URL_META_TT = "https://linktr.ee/yafrica";
const URL_YT = "https://www.youtube.com/playlist?list=PLSCwkooe6sD5jZothn-JbsfdWNl_2UCUk";

const dataDir = path.resolve("./data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Default creatives (you can edit in the UI)
const S1_W1 = `Ces artistes ne racontent pas leur succès, ils racontent leur chemin.
Une série de portraits intimes à écouter dans la saison 1 de Y’Africa.
Disponible sur les plateformes de streaming.`;

const S1_W2 = `Avant la scène et avant l’œuvre, il y a un parcours.
Y’Africa donne la parole à des artistes africains qui racontent ce que créer veut vraiment dire.
Écoutez le podcast dès maintenant.`;

const S1_W3 = `Créer, c’est se construire.
Dans Y’Africa, des artistes racontent leur parcours, leurs doutes et ce qui les a menés à créer leur propre langage.
Écoutez les épisodes sur votre plateforme de streaming.`;

const S2_W1 = `Créer, c’est aussi transmettre.
Dans la saison 2 de Y’Africa, des artistes racontent comment leur histoire, leur culture et leur époque nourrissent leur art.
Écoutez les épisodes sur votre plateforme de streaming.`;

const S2_W2 = `Des artistes qui inspirent bien au-delà de la scène.
Découvrez leurs histoires et leurs parcours dans la saison 2 de Y’Africa.
Écoutez maintenant.`;

const S2_W3 = `Envie d’un podcast qui mêle culture, parcours et inspiration ?
La saison 2 de Y’Africa vous fait découvrir des artistes africains engagés et créatifs.
À écouter sur votre plateforme préférée.`;

const S3_W1 = `Des trajectoires sportives façonnées par l’effort, la discipline et un héritage culturel fort.
La saison 3 de Y’Africa propose un autre regard sur le sport et la performance.
À écouter sur les plateformes de streaming.`;

const S3_W2 = `Le sport raconté autrement, loin des clichés.
Une série de portraits d’athlètes à découvrir dans la saison 3 de Y’Africa.
Disponible sur toutes les plateformes de streaming.`;

const S3_W3 = `Vous aimez les histoires de sport et de dépassement de soi ?
Découvrez les parcours inspirants de sportifs dans la saison 3 de Y’Africa.
Écoutez maintenant.`;

const seeds = [
  // Season 1 examples
  { video:"Teaser S01 - Fofana.mp4", format:"9/16", season:1, targeting:"Culture", platforms:"META,TIKTOK,YOUTUBE", wording:S1_W3 },
  { video:"Teaser S01 - McOne.mp4", format:"9/16", season:1, targeting:"Culture", platforms:"META,TIKTOK,YOUTUBE", wording:S1_W3 },
  { video:"Teaser S01 - YaMado.mp4", format:"9/16", season:1, targeting:"Culture", platforms:"META,TIKTOK,YOUTUBE", wording:S1_W3 },
  { video:"Teaser S01 court.mp4", format:"9/16", season:1, targeting:"Culture", platforms:"META,TIKTOK,YOUTUBE", wording:S1_W3 },
  { video:"Teaser S01 long.mp4", format:"9/16", season:1, targeting:"Culture", platforms:"META,TIKTOK,YOUTUBE", wording:S1_W2 },

  // Season 2 examples
  { video:"Teaser S02 - C Katcha.mp4", format:"9/16", season:2, targeting:"Culture", platforms:"META,TIKTOK,YOUTUBE", wording:S2_W2 },
  { video:"Teaser S02 - Doulsy.mp4", format:"9/16", season:2, targeting:"Culture", platforms:"META,TIKTOK,YOUTUBE", wording:S2_W2 },
  { video:"Teaser S02 - Ouattara.mp4", format:"9/16", season:2, targeting:"Culture", platforms:"META,TIKTOK,YOUTUBE", wording:S2_W2 },
  { video:"Teaser S02 court.mp4", format:"9/16", season:2, targeting:"Culture", platforms:"META,TIKTOK,YOUTUBE", wording:S2_W3 },
  { video:"Teaser S02 long.mp4", format:"9/16", season:2, targeting:"Culture", platforms:"META,TIKTOK,YOUTUBE", wording:S2_W1 },

  // Season 3 examples
  { video:"Teaser S03 - Boipelo.mp4", format:"9/16", season:3, targeting:"Sport", platforms:"META,TIKTOK,YOUTUBE", wording:S3_W2 },
  { video:"Teaser S03 - Kaylia.mp4", format:"9/16", season:3, targeting:"Sport", platforms:"META,TIKTOK,YOUTUBE", wording:S3_W2 },
  { video:"Teaser S03 - Kipruto.mp4", format:"9/16", season:3, targeting:"Sport", platforms:"META,TIKTOK,YOUTUBE", wording:S3_W2 },
  { video:"Teaser S03 court.mp4", format:"9/16", season:3, targeting:"Sport", platforms:"META,TIKTOK,YOUTUBE", wording:S3_W3 },
  { video:"Teaser S03 long.mp4", format:"9/16", season:3, targeting:"Sport", platforms:"META,TIKTOK,YOUTUBE", wording:S3_W1 },
];

db.serialize(() => {
  db.run(`DELETE FROM creatives`);
  const stmt = db.prepare(`
    INSERT INTO creatives (video, format, season, targeting, platforms, wording, url_meta_tiktok, url_youtube)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const s of seeds) {
    stmt.run(
      sanitizeText(s.video),
      sanitizeText(s.format),
      s.season,
      sanitizeText(s.targeting),
      sanitizeText(s.platforms),
      sanitizeText(s.wording),
      URL_META_TT,
      URL_YT
    );
  }

  stmt.finalize(() => {
    console.log("Seed complete.");
    db.close();
  });
});
