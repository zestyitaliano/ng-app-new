import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  disabled?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange,
  disabled 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-xs mx-auto mb-6">
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            relative w-full cursor-pointer rounded-none bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-slate-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
          `}
        >
          <span className="block truncate">
            <span className="text-slate-500 mr-2">Language:</span>
            {SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.label}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-none bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <li
                key={lang.code}
                className={`relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-offwhite text-slate-900`}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
              >
                <span className={`block truncate ${selectedLanguage === lang.code ? 'font-bold text-primary' : 'font-normal'}`}>
                  {lang.label}
                </span>
                {selectedLanguage === lang.code && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;