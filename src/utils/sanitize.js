import DOMPurify from "dompurify";
export const sanitizeText = (input, maxLen = 2000) => {
  const clean = DOMPurify.sanitize(String(input), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim();
  return clean.slice(0, maxLen);
};
