import { normalizeUrl } from "../utils/urlHelpers";

export async function fetchPageHtmlViaProxy(input: string): Promise<string> {
  const url = normalizeUrl(input);

  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // Fall through to proxy attempt.
  }

  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const proxyResponse = await fetch(proxyUrl);

  if (!proxyResponse.ok) {
    throw new Error("Failed to fetch page source.");
  }

  return proxyResponse.text();
}
