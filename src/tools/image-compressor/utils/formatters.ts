export const formatBytes = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const calculateSavings = (original: number, compressed: number): string => {
  if (original === 0) return '0%';
  const savings = ((original - compressed) / original) * 100;
  return savings.toFixed(1) + '%';
};

export const generateFilename = (originalName: string, outputBlob: Blob, format: string): string => {
    const dotIndex = originalName.lastIndexOf('.');
    const nameWithoutExt = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
    
    let ext = '';
    if (format === 'image/jpeg') ext = 'jpg';
    else if (format === 'image/webp') ext = 'webp';
    else {
        // Keep original extension or derive from blob type
        const match = outputBlob.type.match(/^image\/(.+)$/);
        ext = match ? match[1] : 'img';
    }
    
    return `${nameWithoutExt}-compressed.${ext}`;
};