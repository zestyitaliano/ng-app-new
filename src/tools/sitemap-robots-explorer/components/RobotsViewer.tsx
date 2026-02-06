import React from 'react';

interface RobotsViewerProps {
  content: string | null;
}

const RobotsViewer: React.FC<RobotsViewerProps> = ({ content }) => {
  if (!content) return null;

  return (
    <div className="mb-12 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-none bg-brand-yellow"></div>
        <h2 className="text-xl font-bold text-brand-blue">robots.txt Analysis</h2>
      </div>
      <div className="bg-[#1f2937] text-gray-300 p-6 rounded-none shadow-inner font-mono text-sm overflow-x-auto overflow-y-auto max-h-64 custom-scrollbar whitespace-pre">
        {content}
      </div>
    </div>
  );
};

export default RobotsViewer;