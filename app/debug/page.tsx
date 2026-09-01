'use client';

import { useState, useEffect } from 'react';

const testImages = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
];

export default function DebugPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [mounted]);

  const handleImageError = (error: any) => {
    console.error('Image load error:', error);
    setImageError(`Failed to load image: ${testImages[currentIndex]}`);
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Image Carousel Debug</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Status Information:</h2>
        <div className="bg-gray-800 p-4 rounded">
          <p>Current Image: {currentIndex + 1} / {testImages.length}</p>
          <p>Image Path: {testImages[currentIndex]}</p>
          <p>Mounted: {mounted ? 'Yes' : 'No'}</p>
          {imageError && <p className="text-red-400">Error: {imageError}</p>}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Image Test:</h2>
        <div className="relative w-full max-w-4xl mx-auto h-96 bg-gray-800 rounded-lg overflow-hidden">
          {testImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Test image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
                onLoad={() => setImageError(null)}
              />
              <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Manual Controls:</h2>
        <div className="flex gap-2">
          {testImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`px-4 py-2 rounded ${
                index === currentIndex
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Image {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Image Paths:</h2>
        <ul className="list-disc list-inside bg-gray-800 p-4 rounded">
          {testImages.map((image, index) => (
            <li key={index} className={index === currentIndex ? 'text-blue-400' : ''}>
              {image}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <a href="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}