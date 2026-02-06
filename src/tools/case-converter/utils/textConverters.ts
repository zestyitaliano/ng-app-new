import { CaseType, SMALL_WORDS } from '../types';

/**
 * Helper to split text into words for code cases (camel, snake, etc).
 * Converts non-alphanumeric characters to spaces and splits.
 */
const splitToWords = (text: string): string[] => {
  // Replace non-alphanumeric (excluding separators within words if needed, but strictly: separate by non-word chars)
  // We keep numbers attached to words if possible, or separate them.
  // Strategy: Replace all non-alphanumeric chars with space, then split by space.
  // Also handle camelCase inputs splitting (e.g., "myVariable" -> "my Variable")
  
  const cleaned = text
    // Insert space before capital letters if preceded by lowercase (camelCase splitting)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Replace non-alphanumeric characters with spaces
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim();
    
  return cleaned.split(/\s+/).filter(Boolean);
};

export const convertText = (text: string, type: CaseType): string => {
  if (!text) return '';

  switch (type) {
    case CaseType.Sentence:
      // Lowercase everything first
      const lowerSentence = text.toLowerCase();
      // Capitalize first letter of string
      // Capitalize first letter after [.?!] followed by whitespace
      return lowerSentence.replace(/(^\s*[a-z]|[?!.]\s+[a-z])/g, (match) => match.toUpperCase());

    case CaseType.Lower:
      return text.toLowerCase();

    case CaseType.Upper:
      return text.toUpperCase();

    case CaseType.Title:
      return text.toLowerCase().replace(/\b\w+/g, (word, index, fullText) => {
        // Check if word is a small word
        if (SMALL_WORDS.has(word) && index !== 0) {
          // Check if it's the last word (approximate check by seeing if it's at the end)
          const isLastWord = index + word.length === fullText.length;
          // Also need to check if it follows a sentence terminator which effectively makes it a start
          const prevChar = index > 0 ? fullText[index - 1] : '';
          const isAfterPunctuation = /[.?!]\s*$/.test(fullText.slice(0, index));
          
          if (!isLastWord && !isAfterPunctuation) {
            return word;
          }
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

    case CaseType.Capitalize:
      return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

    case CaseType.Alternating:
      return text.split('').map((char, i) => 
        i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      ).join('');

    case CaseType.Inverse:
      return text.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('');

    case CaseType.Camel: {
      const words = splitToWords(text);
      return words.map((word, i) => {
        const lower = word.toLowerCase();
        return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
      }).join('');
    }

    case CaseType.Pascal: {
      const words = splitToWords(text);
      return words.map(word => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }).join('');
    }

    case CaseType.Snake:
      return splitToWords(text).join('_').toLowerCase();

    case CaseType.Kebab:
      return splitToWords(text).join('-').toLowerCase();

    case CaseType.Constant:
      return splitToWords(text).join('_').toUpperCase();

    default:
      return text;
  }
};
