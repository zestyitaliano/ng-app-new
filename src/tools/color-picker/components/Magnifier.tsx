import React, { useEffect, useRef } from 'react';
import { Coordinates } from '../types';

interface MagnifierProps {
  sourceCanvas: HTMLCanvasElement | null;
  cursorPos: Coordinates;
  show: boolean;
  zoom?: number; // Zoom level (e.g., 8x, 10x)
  size?: number; // Size of the magnifier box in pixels
}

export const Magnifier: React.FC<MagnifierProps> = ({ 
  sourceCanvas, 
  cursorPos, 
  show, 
  zoom = 10, 
  size = 120 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sourceCanvas || !show) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear magnifier canvas
    ctx.clearRect(0, 0, size, size);

    // Disable smoothing to show pixels clearly
    ctx.imageSmoothingEnabled = false;

    // Calculate dimensions
    const sampleSize = size / zoom;
    const halfSample = sampleSize / 2;
    
    // The source x/y are the raw image coordinates
    // We want to sample a small box around the cursor
    const sx = cursorPos.x - halfSample;
    const sy = cursorPos.y - halfSample;

    // Draw the zoomed image
    // source: sourceCanvas, sx, sy, sw, sh
    // dest: 0, 0, size, size
    ctx.drawImage(
      sourceCanvas,
      sx, sy, sampleSize, sampleSize,
      0, 0, size, size
    );

    // Draw Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // Vertical grid lines
    for (let i = 0; i <= size; i += zoom) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
    }
    // Horizontal grid lines
    for (let i = 0; i <= size; i += zoom) {
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
    }
    ctx.stroke();

    // Draw Crosshair (Secondary Yellow box around the center pixel)
    const centerStart = (size / 2) - (zoom / 2);
    ctx.strokeStyle = '#ffca3a'; // Secondary Yellow
    ctx.lineWidth = 2;
    ctx.strokeRect(centerStart, centerStart, zoom, zoom);

    // Fill the crosshair slightly to highlight
    ctx.fillStyle = 'rgba(255, 202, 58, 0.2)';
    ctx.fillRect(centerStart, centerStart, zoom, zoom);

  }, [sourceCanvas, cursorPos, show, zoom, size]);

  if (!show) return null;

  return (
    <div 
      className="pointer-events-none fixed z-50 border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white"
      style={{
        left: 0,
        top: 0,
        width: size,
        height: size,
        transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`, 
        display: 'none'
      }}
    >
       <canvas ref={canvasRef} width={size} height={size} />
    </div>
  );
};