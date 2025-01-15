import { type FC } from 'react';

export const ProfileProgress: FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm">Profile Completion</span>
        <span className="text-sm">{progress}%</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {progress < 100 && (
        <p className="text-sm text-gray-400 mt-2">
          Complete your profile to activate your shelter account
        </p>
      )}
    </div>
  );
}; 