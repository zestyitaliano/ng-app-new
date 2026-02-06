export const fetchPageSource = async (url: string): Promise<string> => {
  // Using allorigins.win as a reliable CORS proxy for demo purposes.
  // In a production app, you would use your own backend proxy.
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch source: ${response.statusText}`);
  }
  
  const text = await response.text();
  return text;
};