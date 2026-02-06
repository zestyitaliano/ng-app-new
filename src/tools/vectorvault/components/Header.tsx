import React from 'react';
import { FilterState } from '../types';

interface HeaderProps {
  onOpenUpload: () => void;
  filters: FilterState;
  setFilters: (f: FilterState) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenUpload, filters, setFilters }) => {
  return (
    <header className="h-20 border-b border-gray-200 bg-white flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary-500 flex items-center justify-center shadow-md shadow-primary-500/20 rounded-none">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 uppercase">VectorVault</h1>
      </div>

      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 border border-gray-200 leading-5 bg-offwhite text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm font-medium transition-all duration-200 rounded-none"
            placeholder="Search icons (e.g. 'arrow', 'user', 'download')..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenUpload}
          className="flex items-center gap-2 px-6 py-3 bg-secondary-yellow text-gray-900 text-sm font-bold border border-transparent hover:bg-[#ebd04e] transition-all focus:outline-none focus:ring-0 active:bg-[#dbbf41] uppercase tracking-wide rounded-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M12 4v16m8-8H4" />
          </svg>
          UPLOAD
        </button>
      </div>
    </header>
  );
};