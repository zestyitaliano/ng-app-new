import React, { useState, useEffect } from 'react';

interface LinkCategoryProps {
  category: string;
  links: string[];
  globalExpandState?: { isOpen: boolean; timestamp: number };
}

const PAGE_SIZE = 50;

const LinkCategory: React.FC<LinkCategoryProps> = ({ category, links, globalExpandState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (globalExpandState) {
      setIsOpen(globalExpandState.isOpen);
    }
  }, [globalExpandState]);

  const handleShowMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibleCount(prev => prev + PAGE_SIZE);
  };

  const visibleLinks = links.slice(0, visibleCount);

  return (
    <div className="bg-white rounded-none shadow-sm border border-brand-blue/10 overflow-hidden transition-all duration-300 hover:shadow-md h-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`min-w-[2rem] h-8 rounded-none px-2 flex items-center justify-center text-xs font-bold transition-colors ${isOpen ? 'bg-brand-blue text-white' : 'bg-brand-blue/10 text-brand-blue'}`}>
            {links.length}
          </span>
          <h3 className="text-lg font-bold text-gray-800 text-left break-all">{category}</h3>
        </div>
        <span className={`text-brand-blue transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="p-5 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {visibleLinks.map((link, idx) => {
                let label = link;
                try {
                    const u = new URL(link);
                    if (u.pathname === '/' && u.search) {
                       label = u.search;
                    } else {
                       label = u.pathname + u.search;
                    }
                    if (label === '/' || label === '') label = 'Homepage';
                } catch(e) {}
                
                return (
                    <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-2 text-sm font-medium text-white bg-brand-red hover:bg-[#ff3b41] rounded-none shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 truncate max-w-full"
                        title={link}
                    >
                        {label}
                    </a>
                )
            })}
          </div>
          {visibleCount < links.length && (
            <div className="mt-4 text-center">
              <button 
                onClick={handleShowMore}
                className="text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline py-2"
              >
                Load {Math.min(PAGE_SIZE, links.length - visibleCount)} more...
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkCategory;