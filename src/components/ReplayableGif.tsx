import React, { useRef } from 'react';
import Image from 'next/image';

interface ReplayableGifProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ReplayableGif({ src, alt, className = '' }: ReplayableGifProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleReplay = () => {
    // Force the GIF to reload by updating the src with a cache-busting query param
    if (imgRef.current) {
      const currentSrc = imgRef.current.src;
      const timestamp = new Date().getTime();
      const newSrc = currentSrc.split('?')[0] + '?t=' + timestamp;
      imgRef.current.src = newSrc;
    }
  };

  return (
    <div className={`relative h-full w-full group ${className}`}>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        className="object-contain"
        unoptimized // Required for GIFs to work properly
      />
      <button
        onClick={handleReplay}
        className="absolute bottom-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 z-10"
        aria-label="Replay animation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
} 