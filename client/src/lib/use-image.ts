import { useState, useEffect } from 'react';

/**
 * Custom hook for reliably loading images with fallback paths
 * 
 * @param imagePath Base image path to try
 * @param fallbacks Additional path formats to try if the first one fails
 * @returns Object with loaded image path and loading state
 */
export function useImage(imagePath: string, fallbacks: string[] = []) {
  const [src, setSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const tryLoadImage = (path: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(path);
        img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
        img.src = path;
      });
    };

    // Generate different path formats to try
    const baseFileName = imagePath.split('/').pop();
    if (!baseFileName) {
      setError(new Error('Invalid image path'));
      setIsLoading(false);
      return;
    }

    // Standard variations to try in addition to explicit fallbacks
    const pathVariations = [
      imagePath,                         // Original path
      ...fallbacks,                      // User-provided fallbacks
      `/assets/${baseFileName}`,         // Absolute from root
      `assets/${baseFileName}`,          // Relative without ./
      `./assets/${baseFileName}`,        // Relative with ./
    ];

    setIsLoading(true);

    // Try each path variation until one works
    const tryPaths = async () => {
      for (const path of pathVariations) {
        try {
          const resolvedPath = await tryLoadImage(path);
          console.log(`[ImageLoader] Successfully loaded: ${resolvedPath}`);
          setSrc(resolvedPath);
          setIsLoading(false);
          return;
        } catch (err) {
          console.log(`[ImageLoader] Failed to load: ${path}`);
          // Continue to the next variation
        }
      }

      // If we get here, all variations failed
      setError(new Error(`Failed to load image: ${imagePath}`));
      setIsLoading(false);
    };

    tryPaths();
  }, [imagePath, fallbacks]);

  return { src, isLoading, error };
}