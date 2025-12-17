// server/sanitize.js
export function sanitizeText(input = "") {
  return String(input)
    // NBSP + thin NBSP -> normal space
    .replace(/\u00A0|\u202F/g, " ")
    // curly quotes -> straight quotes
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    // long dashes -> hyphen
    .replace(/[–—]/g, "-")
    // ellipsis -> 3 dots
    .replace(/…/g, "...")
    // collapse multiple spaces
    .replace(/[ \t]{2,}/g, " ")
    // normalize line endings
    .replace(/\r\n/g, "\n")
    .trim();
}
