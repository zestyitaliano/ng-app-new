import React, { useState } from 'react';

interface InputFormProps {
  onFetch: (url: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onFetch, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      let submitUrl = url.trim();
      if (!submitUrl.startsWith('http')) {
        submitUrl = `https://${submitUrl}`;
      }
      onFetch(submitUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 p-4 rounded-none border-2 border-brand-blue/20 focus:border-brand-blue outline-none text-lg font-syne shadow-sm transition-all bg-white"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-8 py-4 rounded-none font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-blue hover:bg-[#156a9e]'}
          `}
        >
          {isLoading ? 'Scanning...' : 'Explore'}
        </button>
      </div>
    </form>
  );
};

export default InputForm;