'use client';

import { useTheme } from '@/components/ThemeProvider';

interface ThemeImageProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  className?: string;
}

/**
 * ThemeImage component that renders different images based on the current theme.
 * Shows lightSrc in light mode and darkSrc in dark mode with enhanced dark mode styling.
 *
 * @param lightSrc - Image source for light mode
 * @param darkSrc - Image source for dark mode
 * @param alt - Alt text for the image
 * @param className - Optional CSS classes to apply to the image
 */
export default function ThemeImage({ lightSrc, darkSrc, alt, className = '' }: ThemeImageProps) {
  const { theme } = useTheme();

  return (
    <div className="relative inline-block w-full">
      <img
        src={theme === 'dark' ? darkSrc : lightSrc}
        alt={alt}
        className={`${className} ${
          theme === 'dark'
            ? 'ring-2 ring-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] border-2 border-blue-400/20'
            : ''
        }`}
        style={
          theme === 'dark'
            ? {
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.3)',
              }
            : undefined
        }
      />
    </div>
  );
}
