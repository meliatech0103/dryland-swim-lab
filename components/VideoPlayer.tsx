'use client';

import { useState } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  unlocked?: boolean;
  unlockVideo?: () => void;
}

export default function VideoPlayer({
  src,
  poster,
  unlocked = true,
  unlockVideo,
}: VideoPlayerProps) {
  const [error, setError] = useState<string | null>(null);

  const handleVideoError = () => {
    setError('Video failed to load, please try again later');
  };

  if (!unlocked) {
    return (
      <div className="aspect-video bg-gray-900 rounded-lg flex flex-col items-center justify-center text-white p-8">
        <svg
          className="w-16 h-16 mb-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2">Content Locked</h3>
        <p className="text-gray-400 mb-4">Enter password to unlock full video</p>
        {unlockVideo && (
          <button
            onClick={unlockVideo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Enter Unlock Password
          </button>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="aspect-video bg-red-900 rounded-lg flex items-center justify-center text-white p-8">
        <div className="text-center">
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <video
        src={src}
        poster={poster}
        controls
        className="w-full h-full"
        onError={handleVideoError}
      >
        Your browser does not support video playback.
      </video>
    </div>
  );
}