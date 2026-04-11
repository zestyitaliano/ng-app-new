import JSZip from 'jszip';
import type { ExtractedImage } from '../../../types';

export const downloadAsZip = async (images: ExtractedImage[]) => {
  const zip = new JSZip();
  const folder = zip.folder("sourcelens_assets");
  
  if (!folder) throw new Error("Failed to create zip folder");

  const nameTracker: Record<string, number> = {};

  // Helper to fetch blob with fallback
  const fetchBlob = async (url: string): Promise<Blob> => {
    try {
      // 1. Try Direct Fetch
      const response = await fetch(url);
      if (response.ok) return await response.blob();
      throw new Error('Direct fetch failed');
    } catch (e) {
      // 2. Try Proxy Fetch (for CORS)
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const proxyResponse = await fetch(proxyUrl);
      if (proxyResponse.ok) return await proxyResponse.blob();
      throw new Error(`Failed to fetch image: ${url}`);
    }
  };

  const promises = images.map(async (img) => {
    try {
      const blob = await fetchBlob(img.url);
      
      // Determine Filename
      // Get the last segment of the URL path
      let cleanUrl = img.url.split('?')[0];
      let filename = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1);
      
      // Fallback filename if empty or weird
      if (!filename || filename.length > 50) {
        filename = `image_${img.id.substring(0, 8)}`;
      }

      // Append extension if missing
      if (!filename.includes('.')) {
        filename = `${filename}.${img.type === 'unknown' ? 'jpg' : img.type}`;
      }

      // Handle duplicate names
      if (nameTracker[filename]) {
        const parts = filename.split('.');
        const ext = parts.pop();
        const base = parts.join('.');
        nameTracker[filename]++;
        filename = `${base}_${nameTracker[filename]}.${ext}`;
      } else {
        nameTracker[filename] = 1;
      }

      folder.file(filename, blob);
    } catch (error) {
      console.warn(`Skipping ${img.url} due to download error`, error);
    }
  });

  await Promise.all(promises);
  
  const content = await zip.generateAsync({ type: "blob" });
  
  // Trigger Download
  const downloadUrl = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `sourcelens_images_${new Date().toISOString().slice(0,10)}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
};
