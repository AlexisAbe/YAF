// server/seedData.js
export const URL_META_TT = "https://linktr.ee/yafrica";
export const URL_YT =
  "https://www.youtube.com/playlist?list=PLSCwkooe6sD5jZothn-JbsfdWNl_2UCUk";

// Wordings (version "safe" pour Ads : apostrophes simples, pas de typo IA)
const S1_W1 =
  "Ces artistes ne racontent pas leur succes, ils racontent leur chemin.\n" +
  "Une serie de portraits intimes a ecouter dans la saison 1 de Y'Africa.\n" +
  "Disponible sur les plateformes de streaming.";

const S1_W2 =
  "Avant la scene et avant l'oeuvre, il y a un parcours.\n" +
  "Y'Africa donne la parole a des artistes qui racontent ce que creer veut vraiment dire.\n" +
  "Ecoutez le podcast des maintenant.";

const S1_W3 =
  "Creer, c'est se construire.\n" +
  "Dans Y'Africa, des artistes racontent leur parcours, leurs doutes et ce qui les a menes a creer leur propre langage.\n" +
  "Ecoutez les episodes sur votre plateforme de streaming.";

const S2_W1 =
  "Creer, c'est aussi transmettre.\n" +
  "Dans la saison 2 de Y'Africa, des artistes racontent comment leur histoire, leur culture et leur epoque nourrissent leur art.\n" +
  "Ecoutez les episodes sur votre plateforme de streaming.";

const S2_W2 =
  "Des artistes qui inspirent bien au-dela de la scene.\n" +
  "Decouvrez leurs histoires et leurs parcours dans la saison 2 de Y'Africa.\n" +
  "Ecoutez maintenant.";

const S2_W3 =
  "Envie d'un podcast qui mele culture, parcours et inspiration ?\n" +
  "La saison 2 de Y'Africa vous fait decouvrir des artistes engages et creatifs.\n" +
  "A ecouter sur votre plateforme preferee.";

const S3_W1 =
  "Des trajectoires sportives faconnees par l'effort, la discipline et un heritage culturel fort.\n" +
  "La saison 3 de Y'Africa propose un autre regard sur le sport et la performance.\n" +
  "A ecouter sur les plateformes de streaming.";

const S3_W2 =
  "Le sport raconte autrement, loin des cliches.\n" +
  "Une serie de portraits d'athletes a decouvrir dans la saison 3 de Y'Africa.\n" +
  "Disponible sur toutes les plateformes de streaming.";

const S3_W3 =
  "Vous aimez les histoires de sport et de depassement de soi ?\n" +
  "Decouvrez les parcours inspirants de sportifs dans la saison 3 de Y'Africa.\n" +
  "Ecoutez maintenant.";

// Helpers
const P_ALL = "META,TIKTOK,YOUTUBE";
const P_YT = "YOUTUBE";

export const SEED_CREATIVES = [
  // Saison 1 - 9/16 (Meta/TikTok/YouTube)
  { video: "Teaser S01 - Fofana.mp4", format: "9/16", season: 1, targeting: "Culture", platforms: P_ALL, wording: S1_W3 },
  { video: "Teaser S01 - McOne.mp4",  format: "9/16", season: 1, targeting: "Culture", platforms: P_ALL, wording: S1_W3 },
  { video: "Teaser S01 - YaMado.mp4", format: "9/16", season: 1, targeting: "Culture", platforms: P_ALL, wording: S1_W3 },
  { video: "Teaser S01 court.mp4",    format: "9/16", season: 1, targeting: "Culture", platforms: P_ALL, wording: S1_W3 },
  { video: "Teaser S01 long.mp4",     format: "9/16", season: 1, targeting: "Culture", platforms: P_ALL, wording: S1_W2 },

  // Saison 2 - 9/16 (Meta/TikTok/YouTube)
  { video: "Teaser S02 - C Katcha.mp4",  format: "9/16", season: 2, targeting: "Culture", platforms: P_ALL, wording: S2_W2 },
  { video: "Teaser S02 - Doulsy.mp4",    format: "9/16", season: 2, targeting: "Culture", platforms: P_ALL, wording: S2_W2 },
  { video: "Teaser S02 - Ouattara.mp4",  format: "9/16", season: 2, targeting: "Culture", platforms: P_ALL, wording: S2_W2 },
  { video: "Teaser S02 court.mp4",       format: "9/16", season: 2, targeting: "Culture", platforms: P_ALL, wording: S2_W3 },
  { video: "Teaser S02 long.mp4",        format: "9/16", season: 2, targeting: "Culture", platforms: P_ALL, wording: S2_W1 },

  // Saison 3 - 9/16 (Meta/TikTok/YouTube)
  { video: "Teaser S03 - Boipelo.mp4", format: "9/16", season: 3, targeting: "Sport", platforms: P_ALL, wording: S3_W2 },
  { video: "Teaser S03 - Kaylia.mp4",  format: "9/16", season: 3, targeting: "Sport", platforms: P_ALL, wording: S3_W2 },
  { video: "Teaser S03 - Kipruto.mp4", format: "9/16", season: 3, targeting: "Sport", platforms: P_ALL, wording: S3_W2 },
  { video: "Teaser S03 court.mp4",     format: "9/16", season: 3, targeting: "Sport", platforms: P_ALL, wording: S3_W3 },
  { video: "Teaser S03 long.mp4",      format: "9/16", season: 3, targeting: "Sport", platforms: P_ALL, wording: S3_W1 },

  // Bande-annonces YouTube (16/9)
  { video: "BandeAnnonceGenerique_Courte_1.mp4",      format: "16/9", season: 1, targeting: "Culture", platforms: P_YT, wording: S1_W1 },
  { video: "BandeAnnonceGenerique_Longue_1.mp4",      format: "16/9", season: 1, targeting: "Culture", platforms: P_YT, wording: S1_W2 },
  { video: "BandeAnnonceGenerique_S2_Courte_1_FR.mp4",format: "16/9", season: 2, targeting: "Culture", platforms: P_YT, wording: S2_W3 },
  { video: "BandeAnnonceGenerique_S2_Longue_1_FR.mp4",format: "16/9", season: 2, targeting: "Culture", platforms: P_YT, wording: S2_W1 },
  { video: "BandeAnnonceGenerique_S3_Courte_1_FR.mp4",format: "16/9", season: 3, targeting: "Sport",   platforms: P_YT, wording: S3_W3 },
  { video: "BandeAnnonceGenerique_S3_Longue_2_FR.mp4",format: "16/9", season: 3, targeting: "Sport",   platforms: P_YT, wording: S3_W1 },

  // Teasers artistes YouTube (16/9) - Saison 2
  { video: "TeaserArtiste_AhmedFofana_EP2_Mali.mp4",                format: "16/9", season: 2, targeting: "Culture", platforms: P_YT, wording: S2_W2 },
  { video: "TeaserArtiste_C'Katcha_S2EP1_Cote_d'Ivoire_FR.mp4",     format: "16/9", season: 2, targeting: "Culture", platforms: P_YT, wording: S2_W2 },
  { video: "TeaserArtiste_Doulsy_S2EP2_Senegal_FR.mp4",             format: "16/9", season: 2, targeting: "Culture", platforms: P_YT, wording: S2_W2 },
  { video: "TeaserArtiste_McOne_EP2_Cotedlvoire.mp4.mp4",           format: "16/9", season: 2, targeting: "Culture", platforms: P_YT, wording: S2_W2 },
  { video: "TeaserArtiste_MerveilleYaMado_EP2_RDC.mp4",             format: "16/9", season: 2, targeting: "Culture", platforms: P_YT, wording: S2_W2 },
  { video: "TeaserArtiste_SangaOuatt...7_COTE_D'IVOIRE_FR.mp4",     format: "16/9", season: 2, targeting: "Culture", platforms: P_YT, wording: S2_W2 },

  // Teasers athletes YouTube (16/9) - Saison 3
  { video: "TeaserAthlete_AmosKipruto_Kenya_FR.mp4",        format: "16/9", season: 3, targeting: "Sport", platforms: P_YT, wording: S3_W2 },
  { video: "TeaserAthlete_AwuahBoipelo_AfriqueDuSud_FR.mp4",format: "16/9", season: 3, targeting: "Sport", platforms: P_YT, wording: S3_W2 },
  { video: "TeaserAthlete_Kaylia_Algerie_FR.mp4",           format: "16/9", season: 3, targeting: "Sport", platforms: P_YT, wording: S3_W2 }
];
