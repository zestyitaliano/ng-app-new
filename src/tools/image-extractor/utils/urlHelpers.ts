import { ExtractedImage } from '../types';

export const normalizeUrl = (input: string): string => {
  let url = input.trim();
  if (url.startsWith('view-source:')) {
    url = url.replace('view-source:', '');
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  return url;
};

export const resolveUrl = (relativeUrl: string, baseUrl: string): string => {
  try {
    return new URL(relativeUrl, baseUrl).href;
  } catch (e) {
    return relativeUrl;
  }
};

export const detectImageType = (url: string): ExtractedImage['type'] => {
  const lower = url.toLowerCase();
  if (lower.includes('.jpg') || lower.includes('.jpeg')) return 'jpg';
  if (lower.includes('.png')) return 'png';
  if (lower.includes('.gif')) return 'gif';
  if (lower.includes('.svg')) return 'svg';
  if (lower.includes('.webp')) return 'webp';
  return 'unknown';
};

// Calculate a score for the image based on resolution hints and keywords.
// Higher score = better quality/larger size.
const getImageQualityScore = (url: string): number => {
  let score = 0;
  const lower = url.toLowerCase();

  // 1. Keyword scoring
  // Prioritize "original", "full", "max", "large"
  if (lower.includes('original') || lower.includes('full') || lower.includes('max')) score += 10000;
  if (lower.includes('large') || lower.includes('xhdpi') || lower.includes('2x')) score += 5000;
  if (lower.includes('medium')) score += 1000;
  // Penalize thumbnails
  if (lower.includes('thumb') || lower.includes('small') || lower.includes('mini') || lower.includes('preview')) score -= 5000;

  // 2. Dimension scoring (look for width/height params or patterns)
  // Matches: w=100, width=100, 100x100
  const widthMatch = lower.match(/(?:w|width|width_px|resize)[:=_]?(\d+)/);
  const heightMatch = lower.match(/(?:h|height|height_px)[:=_]?(\d+)/);
  const dimMatch = lower.match(/[-/_](\d{3,})x(\d{3,})[-/_.]/); // e.g. /image_800x600.jpg

  let pixels = 0;
  if (dimMatch) {
    pixels = parseInt(dimMatch[1]) * parseInt(dimMatch[2]);
  } else {
    const w = widthMatch ? parseInt(widthMatch[1]) : 0;
    const h = heightMatch ? parseInt(heightMatch[1]) : 0;
    
    // If we have dimensions, add them to score. 
    // We prioritize dimensions heavily as they are objective measures of quality.
    if (w && h) pixels = w * h;
    else if (w) pixels = w * 1000; // Assume decent aspect ratio if only width
    else if (h) pixels = h * 1000;
  }

  return score + pixels;
};

// Generate a canonical key for an image URL to group variations together.
// e.g. image.jpg?w=100 and image.jpg?w=500 -> image.jpg
const getCanonicalKey = (urlStr: string): string => {
  try {
    const url = new URL(urlStr);
    
    // 1. Remove query params that control size/format/processing
    const paramsToRemove = [
      'w', 'width', 'h', 'height', 'size', 'q', 'quality', 
      'fmt', 'fit', 'crop', 'dpr', 'auto', 's', 'resize', 'u'
    ];
    paramsToRemove.forEach(p => url.searchParams.delete(p));

    let path = url.pathname;
    
    // 2. Normalize path-based sizing
    // Example: /images/photo_200x200.jpg -> /images/photo.jpg
    path = path.replace(/[-_]\d+x\d+(?=\.[a-zA-Z0-9]+$)/, '');
    
    // Example: /images/photo_small.jpg -> /images/photo.jpg
    path = path.replace(/[-_](?:small|medium|large|thumb|thumbnail|preview|full|original)(?=\.[a-zA-Z0-9]+$)/i, '');

    // Reconstruct the URL using the cleaned path and sorted remaining params (to ensure consistency)
    const sortedParams = Array.from(url.searchParams.keys())
      .sort()
      .map(k => `${k}=${url.searchParams.get(k)}`)
      .join('&');
      
    return `${url.origin}${path}${sortedParams ? '?' + sortedParams : ''}`;
  } catch (e) {
    return urlStr;
  }
};

export const deduplicateImages = (images: ExtractedImage[]): ExtractedImage[] => {
  const groups = new Map<string, ExtractedImage>();

  images.forEach(img => {
    // Skip data URIs or invalid URLs from aggregation
    if (img.url.startsWith('data:')) return;

    const key = getCanonicalKey(img.url);
    const existing = groups.get(key);
    
    if (!existing) {
      groups.set(key, img);
    } else {
      // Compare scores to keep the "best" version
      const scoreExisting = getImageQualityScore(existing.url);
      const scoreNew = getImageQualityScore(img.url);
      
      // If new one is better
      if (scoreNew > scoreExisting) {
        groups.set(key, img);
      }
    }
  });

  return Array.from(groups.values());
};

// A robust regex for finding URLs in mixed text content (HTML/JS)
export const findUrlsInText = (text: string, baseUrl: string): ExtractedImage[] => {
  // Pattern matches typical image extensions, including potential query params
  // It looks for http/s protocols OR typical relative paths starting with / or ./ that end in an image extension
  const pattern = /(?:https?:\/\/[^\s"'<>\\]+?\.(?:jpg|jpeg|png|gif|webp|svg)(?:\?[^\s"'<>\\]*)?)|(?:[\s"']\/[^\s"'<>\\]+?\.(?:jpg|jpeg|png|gif|webp|svg)(?:\?[^\s"'<>\\]*)?)/gi;
  
  const matches = text.match(pattern) || [];
  
  const uniqueUrls = new Set<string>();
  const results: ExtractedImage[] = [];

  matches.forEach((match) => {
    // Clean up the match (remove leading quotes or whitespace if regex grabbed them)
    let cleanMatch = match.replace(/^[\s"']/, '');
    
    const fullUrl = resolveUrl(cleanMatch, baseUrl);
    
    if (!uniqueUrls.has(fullUrl)) {
      uniqueUrls.add(fullUrl);
      results.push({
        id: crypto.randomUUID(),
        url: fullUrl,
        type: detectImageType(fullUrl),
        source: 'regex',
        isValid: true // Will be verified in the validation step
      });
    }
  });

  return results;
};

export const checkImageAvailability = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    // Timeout to prevent hanging on slow servers
    setTimeout(() => {
        img.src = ""; // Cancel loading if possible
        resolve(false);
    }, 5000); 
    img.src = url;
  });
};

/**
 * Attempts to parse width and height dimensions from the URL string itself.
 * Supports patterns like: /image_800x600.jpg, ?width=800&height=600, etc.
 */
export const getEstimatedDimensions = (url: string): { width: number; height: number } | null => {
  try {
    const lower = url.toLowerCase();
    
    // 1. Dimensions from filename/path (e.g. image_800x600.jpg, /800x600/image.jpg)
    // Looking for at least 2 digits to avoid false positives with versions like v1x1
    const dimMatch = lower.match(/[-/_](\d{2,})x(\d{2,})(?:[-/_.]|$)/);
    if (dimMatch) {
        const w = parseInt(dimMatch[1]);
        const h = parseInt(dimMatch[2]);
        if (w > 0 && h > 0) return { width: w, height: h };
    }
    
    // 2. Dimensions from query params
    const widthMatch = lower.match(/[?&](?:w|width|width_px|resize)[:=_]?(\d+)/);
    const heightMatch = lower.match(/[?&](?:h|height|height_px)[:=_]?(\d+)/);
    
    if (widthMatch && heightMatch) {
        const w = parseInt(widthMatch[1]);
        const h = parseInt(heightMatch[1]);
        if (w > 0 && h > 0) return { width: w, height: h };
    }
  } catch (e) {
    return null;
  }
  return null;
};
