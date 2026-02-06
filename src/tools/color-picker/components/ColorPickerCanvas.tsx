import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ColorData, Coordinates } from '../types';
import { createColorData } from '../utils/colorUtils';

interface ColorPickerCanvasProps {
  imageSrc: string;
  onHoverColorChange: (color: ColorData | null) => void;
  onSelectColor: (color: ColorData) => void;
}

export const ColorPickerCanvas: React.FC<ColorPickerCanvasProps> = ({
  imageSrc,
  onHoverColorChange,
  onSelectColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const magnifierCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState<{top: number, left: number}>({ top: 0, left: 0 });
  
  const [sourcePixelPos, setSourcePixelPos] = useState<Coordinates>({ x: 0, y: 0 });

  // Load image onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const sourceX = Math.floor(x * scaleX);
    const sourceY = Math.floor(y * scaleY);

    if (sourceX < 0 || sourceX >= canvas.width || sourceY < 0 || sourceY >= canvas.height) {
      onHoverColorChange(null);
      setIsHovering(false);
      return;
    }

    setIsHovering(true);
    setSourcePixelPos({ x: sourceX, y: sourceY });
    
    // Position magnifier with slight offset
    setMagnifierPos({ top: y + 20, left: x + 20 });

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      const pixel = ctx.getImageData(sourceX, sourceY, 1, 1).data;
      const color = createColorData(pixel[0], pixel[1], pixel[2]);
      onHoverColorChange(color);
    }

    // Render Magnifier
    const magCanvas = magnifierCanvasRef.current;
    if (magCanvas) {
      const magCtx = magCanvas.getContext('2d');
      if (magCtx) {
        const size = 100;
        const zoom = 8;
        const sampleSize = size / zoom;
        const halfSample = sampleSize / 2;

        magCtx.clearRect(0, 0, size, size);
        magCtx.imageSmoothingEnabled = false; 

        magCtx.drawImage(
          canvas,
          Math.min(Math.max(0, sourceX - halfSample), canvas.width - sampleSize),
          Math.min(Math.max(0, sourceY - halfSample), canvas.height - sampleSize),
          sampleSize, sampleSize,
          0, 0, size, size
        );

        // Grid
        magCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        magCtx.lineWidth = 1;
        magCtx.beginPath();
        for (let i = 0; i <= size; i += zoom) {
          magCtx.moveTo(i, 0); magCtx.lineTo(i, size);
          magCtx.moveTo(0, i); magCtx.lineTo(size, i);
        }
        magCtx.stroke();

        // Center highlight - Yellow with Glow
        const center = (size / 2) - (zoom / 2);
        
        // Add glow effect
        magCtx.shadowColor = '#ffca3a';
        magCtx.shadowBlur = 12;
        
        magCtx.strokeStyle = '#ffca3a';
        magCtx.lineWidth = 2;
        magCtx.strokeRect(center, center, zoom, zoom);
        
        // Reset shadow for next draw
        magCtx.shadowBlur = 0;
      }
    }

  }, [onHoverColorChange]);

  const handleMouseLeave = () => {
    setIsHovering(false);
    onHoverColorChange(null);
  };

  const handleClick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      const pixel = ctx.getImageData(sourcePixelPos.x, sourcePixelPos.y, 1, 1).data;
      const color = createColorData(pixel[0], pixel[1], pixel[2]);
      onSelectColor(color);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-auto bg-offwhite overflow-hidden border-2 border-slate-200 cursor-crosshair touch-none"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="img"
        aria-label="Uploaded image for color extraction"
      />
      
      {/* Magnifier Portal */}
      <div 
        className={`pointer-events-none absolute z-20 border-4 border-white shadow-[0_12px_24px_rgba(0,0,0,0.25)] ring-1 ring-black/10 bg-white overflow-hidden will-change-transform transition-all duration-75 ease-out ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{
          width: '100px',
          height: '100px',
          top: 0,
          left: 0,
          transform: `translate3d(${magnifierPos.left}px, ${magnifierPos.top}px, 0)`,
        }}
      >
         <canvas ref={magnifierCanvasRef} width={100} height={100} className="block" />
      </div>
    </div>
  );
};