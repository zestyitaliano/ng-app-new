import { PROXIES } from '../types';

/**
 * Fetches content using multiple CORS proxies with fallback.
 */
const fetchWithProxy = async (url: string): Promise<string> => {
  let lastError;
  
  for (const proxyGen of PROXIES) {
    try {
      const proxyUrl = proxyGen(url);
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 15000); // 15s timeout for larger files

      const response = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(id);
      
      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }
      const text = await response.text();
      if (!text || text.trim().length === 0) throw new Error("Empty response");
      return text;
    } catch (e: any) {
      lastError = e;
      continue; // Try next proxy
    }
  }
  throw new Error(`Failed to fetch after retries: ${lastError?.message || 'Unknown error'}`);
};

/**
 * Parses robots.txt content to find Sitemap URLs.
 */
export const parseRobotsTxt = (content: string): string[] => {
  const lines = content.split('\n');
  const sitemaps: string[] = [];
  const sitemapRegex = /^Sitemap:\s*(.+)$/i;

  for (const line of lines) {
    const match = line.trim().match(sitemapRegex);
    if (match && match[1]) {
      sitemaps.push(match[1].trim());
    }
  }
  return sitemaps;
};

/**
 * Parses an XML string to extract URLs from <loc> tags.
 * Handles both sitemapindex (recursive) and urlset (final URLs).
 */
const parseSitemapXml = (xmlContent: string): { urls: string[]; childSitemaps: string[] } => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
  
  const urls: string[] = [];
  const childSitemaps: string[] = [];

  // Check for Sitemap Index
  const sitemapTags = xmlDoc.getElementsByTagName('sitemap');
  for (let i = 0; i < sitemapTags.length; i++) {
    const loc = sitemapTags[i].getElementsByTagName('loc')[0]?.textContent;
    if (loc) childSitemaps.push(loc.trim());
  }

  // Check for UrlSet
  const urlTags = xmlDoc.getElementsByTagName('url');
  for (let i = 0; i < urlTags.length; i++) {
    const loc = urlTags[i].getElementsByTagName('loc')[0]?.textContent;
    if (loc) urls.push(loc.trim());
  }

  return { urls, childSitemaps };
};

export interface BatchResult {
  newLinks: string[];
  newSitemaps: string[];
  processedUrl: string;
  error?: string;
}

/**
 * Initializes the crawl by fetching robots.txt and finding the entry points.
 */
export const fetchRobotsAndRoots = async (
  baseUrl: string
): Promise<{ robotsContent: string; rootSitemaps: string[]; error?: string }> => {
  const rootUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  let robotsContent = '';
  let rootSitemaps: string[] = [];
  let error;

  try {
    robotsContent = await fetchWithProxy(`${rootUrl}/robots.txt`);
    rootSitemaps = parseRobotsTxt(robotsContent);
  } catch (e: any) {
    console.warn('Could not fetch robots.txt, trying default sitemap locations.', e);
    error = `Could not fetch robots.txt (${e.message}). Using defaults.`;
  }

  if (rootSitemaps.length === 0) {
    rootSitemaps = [`${rootUrl}/sitemap.xml`, `${rootUrl}/sitemap_index.xml`];
  }

  return { robotsContent, rootSitemaps, error };
};

/**
 * Processes a single sitemap URL.
 */
export const processSitemap = async (url: string): Promise<BatchResult> => {
  try {
    const content = await fetchWithProxy(url);
    const { urls, childSitemaps } = parseSitemapXml(content);
    return {
      newLinks: urls,
      newSitemaps: childSitemaps,
      processedUrl: url
    };
  } catch (e: any) {
    return {
      newLinks: [],
      newSitemaps: [],
      processedUrl: url,
      error: e.message
    };
  }
};

/**
 * Helper to format string for display
 */
const formatName = (str: string) => {
  const clean = str.replace(/\.(html|php|aspx|jsp|xml|txt)$/i, '');
  const spaced = clean.replace(/[-_]/g, ' ');
  return spaced.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * Categorizes URLs.
 */
export const categorizeLinks = (links: string[]): Record<string, string[]> => {
  const groups: Record<string, string[]> = {};

  links.forEach(link => {
    try {
      const urlObj = new URL(link);
      const path = urlObj.pathname;
      const search = urlObj.search;
      
      const segments = path.split('/').filter(s => s.length > 0);
      
      let categoryName = 'General';

      if (segments.length === 0) {
        if (search && search.length > 1) {
            const params = new URLSearchParams(search);
            const firstKey = params.keys().next().value;
            categoryName = firstKey ? `Query: ${formatName(firstKey)}` : 'Homepage (Query)';
        } else {
            categoryName = 'Homepage';
        }
      } else {
        let segmentIndex = 0;
        let segment = segments[0];

        const isLang = /^[a-z]{2}(-[a-z]{2,})?$/i.test(segment);
        
        if (isLang) {
            if (segments.length > 1) {
                segmentIndex = 1;
                segment = segments[1];
            } else {
                categoryName = `Homepage (${segment.toUpperCase()})`;
            }
        }

        if (categoryName === 'General') {
            const structuralPrefixes = [
              'category', 'categories', 
              'tag', 'tags', 
              'topic', 'topics', 
              'label', 'labels', 
              'collection', 'collections', 
              'archive', 'archives',
              'product-category', 'section', 'sitemap'
            ];
            
            if (structuralPrefixes.includes(segment.toLowerCase()) && segments.length > segmentIndex + 1) {
                const valueSegment = segments[segmentIndex + 1];
                categoryName = `${formatName(segment)}: ${formatName(valueSegment)}`;
            } else {
                categoryName = formatName(segment);
            }
        }
      }

      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }
      groups[categoryName].push(link);

    } catch (e) {
      if (!groups['Invalid']) groups['Invalid'] = [];
      groups['Invalid'].push(link);
    }
  });

  const sortedKeys = Object.keys(groups).sort((a, b) => a.localeCompare(b));
  const sortedGroups: Record<string, string[]> = {};

  sortedKeys.forEach(key => {
    sortedGroups[key] = groups[key].sort((a, b) => a.localeCompare(b));
  });

  return sortedGroups;
};