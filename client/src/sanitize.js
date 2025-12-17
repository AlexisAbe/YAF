export function sanitizeText(input = "") {
  return String(input)
    .replace(/\u00A0|\u202F/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\r\n/g, "\n")
    .trim();
}
