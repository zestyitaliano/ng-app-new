import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IconGrid } from './components/IconGrid';
import { IconEditor } from './components/IconEditor';
import { AdminUpload } from './components/AdminUpload';
import { iconService } from './services/iconService';
import { IconData, FilterState } from './types';

export default function VectorVaultTool() {
  const [icons, setIcons] = useState<IconData[]>([]);
  const [filteredIcons, setFilteredIcons] = useState<IconData[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    style: 'all', // 'all' | 'stroke' | 'fill'
  });

  // Initial Load
  useEffect(() => {
    const loadIcons = () => {
      const allIcons = iconService.getAllIcons();
      setIcons(allIcons);
    };
    loadIcons();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let result = icons;

    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      result = result.filter(icon => 
        icon.name.toLowerCase().includes(lowerSearch) ||
        icon.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
      );
    }

    setFilteredIcons(result);
  }, [icons, filters]);

  const handleIconSelect = (icon: IconData) => {
    setSelectedIcon(icon);
  };

  const handleCloseEditor = () => {
    setSelectedIcon(null);
  };

  const handleUploadSave = (newIcon: IconData) => {
    iconService.addIcon(newIcon);
    setIcons(iconService.getAllIcons());
    setIsUploadOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-offwhite text-gray-900">
      {/* Header */}
      <Header 
        onOpenUpload={() => setIsUploadOpen(true)} 
        filters={filters}
        setFilters={setFilters}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex relative">
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
           <div className="max-w-7xl mx-auto">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">
                  Library <span className="text-gray-500 ml-2 text-sm font-semibold">{filteredIcons.length} icons</span>
                </h2>
                {/* Quick style toggles could go here */}
              </div>
              
              {filteredIcons.length > 0 ? (
                <IconGrid icons={filteredIcons} onSelect={handleIconSelect} />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <p className="text-lg font-bold">No icons found.</p>
                  <button 
                    onClick={() => setFilters({ ...filters, search: '' })}
                    className="mt-2 text-primary-500 hover:text-primary-600 font-semibold underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
           </div>
        </div>

        {/* Editor Modal/Slide-over */}
        {selectedIcon && (
          <IconEditor 
            icon={selectedIcon} 
            onClose={handleCloseEditor} 
          />
        )}

        {/* Upload Modal */}
        {isUploadOpen && (
          <AdminUpload 
            onClose={() => setIsUploadOpen(false)}
            onSave={handleUploadSave}
          />
        )}
      </main>
    </div>
  );
}