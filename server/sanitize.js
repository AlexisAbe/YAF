export function sanitizeText(input = "") {
  return String(input)
    // NBSP and narrow NBSP -> space
    .replace(/\u00A0|\u202F/g, " ")
    // smart quotes -> straight quotes
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    // en/em dashes -> hyphen
    .replace(/[–—]/g, "-")
    // ellipsis -> three dots
    .replace(/…/g, "...")
    // collapse multiple spaces/tabs
    .replace(/[ \t]{2,}/g, " ")
    // normalize CRLF
    .replace(/\r\n/g, "\n")
    .trim();
}
