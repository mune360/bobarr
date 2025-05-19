/**
 * Sanitize a string by removing or replacing special characters
 * Handles special cases like abbreviated years (e.g., '97) and common punctuation
 */
export function sanitize(str: string): string {
  if (!str) return '';
  
  // Convert to lowercase first
  let result = str.toLowerCase();

  // Handle apostrophes between letters (like in contractions) - remove without adding space
  result = result.replace(/([a-z0-9])'([a-z0-9])/gi, '$1$2');

  // Handle year abbreviations with apostrophes (e.g., '97)
  result = result.replace(/(^|\s)'(\d{2,4})($|\s)/g, ' $2 ');

  // Remove square brackets (no space)
  result = result.replace(/[\[\]]/g, '');

  // Replace punctuation (, . : ( )) by a space
  result = result.replace(/[,\.:()]/g, ' ');

  // Remove remaining apostrophes (not between letters or part of year)
  result = result.replace(/'/g, '');

  // Replace hyphens with spaces, but only if not part of a word
  result = result.replace(/(\s)-(\s)/g, ' ');

  // Replace other special characters with a space
  result = result.replace(/[^\w\s]/g, ' ');

  // Collapse multiple spaces
  result = result.replace(/\s+/g, ' ');

  // Special case for HDTV without space after number
  result = result.replace(/(\d) (hdtv)/gi, '$1$2');

  // Trim leading and trailing spaces
  result = result.trim();

  return result;
}
