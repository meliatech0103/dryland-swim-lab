'use client';

import { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

// 遮罩颜色方案（固定使用浅色方案，因为这是用户最终的偏好）
const OVERLAY_STYLE = {
  className: 'bg-gradient-to-br from-white/60 via-blue-50/50 to-cyan-50/40',
  textClass: 'text-gray-900', // 深色文字
  indicatorActive: 'bg-blue-600',
  indicatorInactive: 'bg-blue-600/50',
  arrowClass: 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-900',
};

export default function ImageCarousel({ images, interval = 5000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, mounted]);

  if (!mounted || images.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-500" />
    );
  }

  return (
    <div className="relative w-full h-full min-h-[600px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: index === currentIndex ? 1 : 0 }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
              minHeight: '600px',
            }}
          />
          {/* 遮罩层 */}
          <div className={`absolute inset-0 ${OVERLAY_STYLE.className}`} />
        </div>
      ))}

      {/* 轮播指示器 */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `${OVERLAY_STYLE.indicatorActive} w-8`
                  : `${OVERLAY_STYLE.indicatorInactive} hover:bg-blue-600/70`
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* 左右箭头 */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${OVERLAY_STYLE.arrowClass} backdrop-blur-sm p-2 rounded-full transition-colors z-50`}
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${OVERLAY_STYLE.arrowClass} backdrop-blur-sm p-2 rounded-full transition-colors z-50`}
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}