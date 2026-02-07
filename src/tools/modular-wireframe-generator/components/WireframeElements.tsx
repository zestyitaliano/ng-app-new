import React from 'react';
import { COLORS } from '../constants';

// A placeholder for an image (Box with an X)
export const ImageBlock: React.FC<{ className?: string; text?: string }> = ({ className = '', text }) => (
  <div 
    className={`relative flex items-center justify-center border-2 overflow-hidden ${className}`}
    style={{ borderColor: COLORS.line, backgroundColor: COLORS.fill }}
  >
    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
      <line x1="0" y1="0" x2="100" y2="100" stroke={COLORS.line} strokeWidth="1" />
      <line x1="100" y1="0" x2="0" y2="100" stroke={COLORS.line} strokeWidth="1" />
    </svg>
    {text && (
      <span className="relative z-10 text-xs font-bold bg-white px-2 py-1 border border-red-200" style={{ color: COLORS.line }}>
        {text}
      </span>
    )}
  </div>
);

// A placeholder for text (Squiggly lines or bars)
export const TextBlock: React.FC<{ lines?: number; className?: string; align?: 'left'|'center'|'right' }> = ({ lines = 3, className = '', align = 'left' }) => {
  const alignClass = align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start';
  return (
    <div className={`flex flex-col gap-2 ${alignClass} ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-2 rounded-full opacity-60"
          style={{ 
            backgroundColor: COLORS.textPlaceholder,
            width: `${Math.max(40, 100 - (i * 15))}%` 
          }}
        />
      ))}
    </div>
  );
};

// A placeholder for a title
export const TitleBlock: React.FC<{ width?: string; className?: string }> = ({ width = '60%', className = '' }) => (
  <div 
    className={`h-6 mb-4 rounded-sm ${className}`}
    style={{ backgroundColor: COLORS.line, width, opacity: 0.8 }}
  />
);

// A placeholder for a button
export const ButtonBlock: React.FC<{ className?: string; variant?: 'primary' | 'secondary' }> = ({ className = '', variant = 'primary' }) => (
  <div 
    className={`h-10 px-6 flex items-center justify-center border-2 font-bold text-sm uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] ${className}`}
    style={{ 
      backgroundColor: variant === 'primary' ? COLORS.highlight : 'transparent',
      borderColor: COLORS.accent,
      color: COLORS.accent
    }}
  >
    CTA BUTTON
  </div>
);

// Generic container
export const Container: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }
> = ({ children, className = '', ...rest }) => (
  <div className={`w-full max-w-6xl mx-auto px-8 ${className}`} {...rest}>
    {children}
  </div>
);
