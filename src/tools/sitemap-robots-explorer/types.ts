export interface CategorizedLinks {
  [category: string]: string[];
}

export interface SitemapState {
  robotsContent: string | null;
  processedSitemaps: string[];
  sitemapQueue: string[];
  links: string[];
  categorizedLinks: CategorizedLinks;
  errors: string[];
  status: 'idle' | 'fetching_robots' | 'processing_batch' | 'paused' | 'complete' | 'error';
  statusMessage: string;
}

export const PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`
];