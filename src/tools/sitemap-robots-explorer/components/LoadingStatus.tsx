import React from 'react';
import Lottie from 'lottie-react';
import { radarAnimationData } from './radarAnimationData';

interface LoadingStatusProps {
  message: string;
}

const LoadingStatus: React.FC<LoadingStatusProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="w-40 h-40 flex items-center justify-center">
        <Lottie 
          animationData={radarAnimationData} 
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <p className="text-brand-blue font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingStatus;