import React from 'react';
import { IconData } from '../types';

interface IconGridProps {
  icons: IconData[];
  onSelect: (icon: IconData) => void;
}

export const IconGrid: React.FC<IconGridProps> = ({ icons, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 pb-20">
      {icons.map((icon) => {
        const isFill = icon.defaultStyle === 'fill';
        return (
          <button
            key={icon.id}
            onClick={() => onSelect(icon)}
            className="group relative flex flex-col items-center justify-center p-6 bg-white rounded-none hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-transparent hover:border-gray-200"
          >
            <div className="w-10 h-10 text-gray-800 group-hover:text-primary-500 transition-colors duration-200 mb-4">
              <svg
                viewBox={icon.viewBox || "0 0 24 24"}
                fill={isFill ? "currentColor" : "none"}
                stroke={isFill ? "none" : "currentColor"}
                strokeWidth={isFill ? 0 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                {icon.path.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </svg>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold truncate w-full text-center group-hover:text-primary-600">
              {icon.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};