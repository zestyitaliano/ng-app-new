import React from 'react';

interface LoadingStatusProps {
  message: string;
}

const LoadingStatus: React.FC<LoadingStatusProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <div className="absolute h-40 w-40 rounded-full border border-brand-blue/20" />
        <div className="absolute h-28 w-28 rounded-full border border-brand-blue/30" />
        <div className="absolute h-16 w-16 rounded-full border border-brand-blue/40" />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-brand-red" />
        <div className="absolute h-40 w-40 origin-center animate-spin">
          <div className="absolute left-1/2 top-1/2 h-1 w-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-blue to-transparent" />
        </div>
      </div>

      <p className="text-brand-blue font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingStatus;
